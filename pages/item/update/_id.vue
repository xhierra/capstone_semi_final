
<template>
    <div class="mt-15 container">
        <v-row >

            <v-col>
                <v-card
                class="modified"
                height="427"
                elevation="1"
                >
                    <v-card-title>List item for sale</v-card-title>

                    <v-card-text style="margin-top:50px">
                        <v-combobox
                        v-model="selectedToken"
                        :items="tokens"
                        item-text="name"
                        item-value="name"
                        color="primary"
                        rounded
                        filled
                        class="mt-3"
                        prepend-inner-icon="mdi-magnify"
                        label="Select token"
                        :loading="tokens.length == 0"
                        
                        >
                            <template slot='item' slot-scope='{ item }'>
                                <v-list-item @click="appendSelectedToken(item.name)">
                                    <v-list-item-icon>
                                        <v-avatar
                                            size="30"
                                        >
                                            <img
                                                :lazy-src="item.logoURI"
                                                :src="item.logoURI"
                                            >
                                        </v-avatar>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.symbol"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-combobox>

                        <div class="d-flex flex-row">

                        <v-text-field
                            type="number"
                            v-model="price"
                            prepend-inner-icon="mdi-currency-php"
                            rounded
                            filled
                            label="Peso Price"
                        />

                        <v-icon class="mb-6 mx-2">mdi-equal</v-icon>

                        <v-text-field  
                            :loading="isloading"
                            v-model="tokenprice"
                            disabled
                            type="number"
                            prepend-inner-icon="mdi-currency-eth"
                            rounded
                            filled
                            :label="selectedToken.length != 0 ? selectedToken.name + ' price' : 'Token Price'"
                        />
                        </div>

                        
                        <v-btn
                        depressed
                        color="primary"
                        block
                        rounded
                        x-large
                        style="text-transform:none;"
                        :disabled="selectedToken.length == 0 && price == null"
                        @click="complete()"
                        >
                            Complete Listing
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <Item
                    
                    v-if="item.length != 0"
                    :img="item.get('previewimg')._url"
                    :name="item.get('name')"
                    :category="item.get('category')"
                    :id="item.id"
                />
            </v-col>

        </v-row>
    </div>
</template>

<script>
    import Item from '~/components/showcaseitem/itemaspreview.vue'
    import Moralis from 'moralis'
    import _ from 'lodash'
    export default {
        components:{
            Item
        },

        data() {
            return {
                item: [],
                tokens:[],
                selectedToken: [],

                isloading: false,

                price: null,
                tokenprice: null

            }
        },
        
        watch: {

            price : function (){
                this.loadprice()
            },

            selectedToken : function (){
                if(this.price != null)
                    this.loadprice()
            }
        },
        methods: {

            async complete () {

                const Item =  this.item

                  await Item.save({
                    pesoprice: this.price,
                    token: this.selectedToken,
                    tokenname: this.selectedToken.name,
                    market: true
                  })
                  .then((save) => {
                   
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text : 'Item listed in the market ' + save.id,
                        color : 'success',
                        icon: 'mdi-check'
                    });
                    
                    this.$router.push('/item/hold')
                    
                  }, (error) => {
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text : error.message,
                        color : 'error'
                    });
                });

            },

            async init () {

                const Item = Moralis.Object.extend("Item");
                const query = new Moralis.Query(Item);
                query.equalTo("objectId", this.$route.params.id);
                const result =  await query.first();
                this.item = result

            },

            async getSupportedTokens() {

                const result = await Moralis.Plugins.oneInch.getSupportedTokens({
                    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                });

                this.tokens = Object.values(result.tokens);
                console.log(result.tokens)
            },

            appendSelectedToken : function (name){
                const key = _.findIndex(this.tokens, function(o) { return o.name == name; })
                this.selectedToken = this.tokens[key]
                console.log(this.selectedToken)
            },

            loadprice: _.debounce(async function(){

                this.isloading = true;
                const send = await this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+`${this.selectedToken.name}`+'&vs_currencies=php');

                const respo = await send.data;
                const calculate = this.price / Object.values(respo)[0].php

                this.tokenprice = calculate.toFixed(5)

                this.isloading = false;

            },1000),
        },
        mounted() {
            this.init()
            this.getSupportedTokens()
        },
    }
</script>

<style lang="scss" scoped>
.modified {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>