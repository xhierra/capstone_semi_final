<template>
<div>
    <v-container class="mt-15 d-flex justify-center">
        <v-card
        width="600"
        shaped
        color="pa-3"
        >
            <v-card-title>
                Swap Coins
            </v-card-title>

            <v-card-subtitle v-if="estimatedGas != null">
                Estimated Gas Fee : {{estimatedGas}}
            </v-card-subtitle>

            <v-card-text>
                <v-card 
                class="effectblurry mb-3"
                outlined>
                    <v-card-title class="caption">
                        From
                        <v-spacer></v-spacer>
                        Balance : 0
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-row">

                            <v-text-field
                            v-model="from_amount"
                            placeholder="0.0"
                            type="number"
                            hide-details
                            filled
                            rounded
                            ></v-text-field>

                            <v-btn
                            text
                            x-large
                            rounded
                            class="ml-1"
                            style="text-transform: none;"
                            @click="select('from')"
                            width="150"
                            >
                                <span v-if="from.length == 0">
                                    Select Currency
                                </span>
                                <span v-else>
                                    <div class="d-flex flex-row">
                                    <v-img
                                        :src="from.logoURI"
                                        :lazy-src="from.logoURI"
                                        height="30"
                                        width="30"
                                        class="mr-1"
                                    >
                                    </v-img>
                                    <h4 class="mt-1">{{from.symbol}}</h4>
                                    </div>
                                </span>
                            </v-btn>
                        
                        </div>
                    </v-card-text>
                </v-card>
                 <v-card 
                class="effectblurry"
                :loading="load"
                outlined>
                    <v-card-title class="caption">
                        To
                        <v-spacer></v-spacer>
                        Balance : 0
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-row">

                            <v-text-field
                            readonly
                            v-model="to_amount"
                            placeholder="0.0"
                            type="number"
                            hide-details
                            filled
                            rounded
                            ></v-text-field>

                            <v-btn
                            text
                            class="ml-1"
                            style="text-transform: none;"
                            @click="select('to')"
                            x-large
                            rounded
                            width="150"
                            >
                                <span v-if="to.length == 0">
                                    Select Currency
                                </span>
                                <span v-else>
                                    <div class="d-flex flex-row">
                                    <v-img
                                        :src="to.logoURI"
                                        :lazy-src="to.logoURI"
                                        height="30"
                                        width="30"
                                        class="mr-1"
                                    >
                                    </v-img>
                                    <h4 class="mt-1">{{to.symbol}}</h4>
                                    </div>
                                </span>
                            </v-btn>
                        
                        </div>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn
                block
                class="primary"
                large
                rounded
                >
                    Swap
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>

    <v-dialog
        transition="dialog-bottom-transition"
        max-width="500"
        max-height="500"
        v-model="dialog"
      >
          <v-card :loading="list.length == 0">
            <v-card-title>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                    rounded
                    filled
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-card-text>
                <v-virtual-scroll
                    :bench="benched"
                    :items="filteredList"
                    height="300"
                    item-height="64"
                >
                    <template v-slot:default="{ item }">
                    <v-list-item
                    @click="swap(item)"
                    :disabled="from == item || to == item"
                    >
                        <v-list-item-icon>
                            <v-img
                                :src="item.logoURI"
                                :lazy-src="item.logoURI"
                                height="30"
                                width="30"
                            >
                            </v-img>
                        </v-list-item-icon>
                                <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>
                    </template>
                </v-virtual-scroll>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</div>
</template>

<script>
    import Moralis from 'moralis'
    import _ from 'lodash'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {

                list : [],
                search: '',


                dialog: false,
                benched: 0,


                from : [],
                to : [],

                from_amount: null,
                to_amount : null,

                estimatedGas: null,

                action : '',

                load: false
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },

            from_amount (val){
                this.getQuote()
            }
        },

        methods:{

            close : function () {
                this.dialog = false
                this.action = ''
            },


            async init () {
                await Moralis.initPlugins();
                await Moralis.enable();
                const result = await Moralis.Plugins.oneInch.getSupportedTokens({
                    chain : 'eth'
                });
                const tokens = result.tokens
                this.list = Object.values(tokens)
                console.log(tokens)
            },

            swap : function (token) {
                switch (this.action) {
                    case "from" :
                        this.from = token
                    break;
                    case "to" :
                        this.to = token
                    break;
                }

                this.getQuote();

                this.close();
                
            },


            getQuote : _.debounce(async function(){
                if(this.from.length == 0 || this.to.length == 0 || this.from_amount == null) return;
                this.load = true
                let amount = Number( 
                    this.from_amount * 10**this.from.decimals 
                )

                const quote = await Moralis.Plugins.oneInch.quote({
                    chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
                    fromTokenAddress: this.from.address, // The token you want to swap
                    toTokenAddress: this.to.address, // The token you want to receive
                    amount: amount,
                });

                this.estimatedGas = quote.estimatedGas;
                this.to_amount = (quote.toTokenAmount / (10**quote.toToken.decimals))
                this.load = false
            },1000),


            async load_eth_balance(){
                const web3 = await Moralis.enable();
                const balances = await Moralis.Web3API.account.getNativeBalance(
                    {
                        chain: 'ropsten'
                    }
                );


                let currentBalance = web3.utils.fromWei(balances.balance, 'ether')
                console.log(parseFloat(currentBalance).toFixed(4));
            },

            select : function (action){
                this.dialog = true;
                this.action = action;
            }

        },
        computed: {
            filteredList() {
                return this.list.filter(token => {
                    return token.name.toLowerCase().includes(this.search.toLowerCase()) || token.symbol.toLowerCase().includes(this.search.toLowerCase())
                })
            },

            ...mapState(
                [
                    'user',
                ]
            ),
        },

        mounted() {
            // this.init()
            this.load_eth_balance();
        }
    }
</script>

<style lang="scss" scoped>


.effectblurry {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}


</style>