<template>
    <div>

        

    <v-navigation-drawer
        v-if="user.length != 0"
        v-model="drawer"
        :clipped="!isNotIndex"
        app
        :right="isNotIndex"
    >

        <v-container>
            <v-card outlined color="transparent" >
                <div class="d-flex justify-center">
                <v-avatar
                color="primary"
                size="80"
                >
                    <v-img
                    v-if="user.length != 0"
                    :src="user.attributes.profilepic._url"
                    >
                    </v-img>
                </v-avatar></div>
                <v-card-title class="justify-center">{{user.attributes.username}}</v-card-title>
                <v-card-subtitle class="text-center">{{user.attributes.bio}}</v-card-subtitle>

                
                <v-card-text>

                    
                    <div class="my-1">
                        <v-icon small>mdi-wallet-outline</v-icon>
                         <span>{{userETH | truncate_address}}</span>
                    </div>

                    <v-card
                    style="
                    backdrop-filter: blur(16px) saturate(180%);
                    border-radius: 12px;
                    border: 1px solid rgba(209, 213, 219, 0.3)
                    "
                    outlined
                    height="100">

                        <v-card-title class="caption">
                           Available Balance
                        </v-card-title>
                        

                        <v-card-text>
                            <v-icon small>mdi-ethereum</v-icon>
                            <span v-if="balance != undefined">{{balance}}</span>
                            <v-progress-circular
                                v-if="balance == undefined"
                                indeterminate
                                :size="15"
                                color="primary"
                            ></v-progress-circular>
                        </v-card-text>
                    </v-card>

                    <v-container>
                    <v-list
                    rounded
                    >
                        <v-list-item @click="buy_crypto()">  
                        <v-list-item-action>
                            <v-icon color="warning">mdi-bitcoin</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Buy</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="swap_dialog = true">
                        <v-list-item-action>
                            <v-icon color="primary">mdi-swap-horizontal</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Swap</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-container>
                   

                </v-card-text>
            </v-card>
        </v-container>
    </v-navigation-drawer>

    <v-app-bar
        clipped-left
        fixed
        app
        flat
        style="
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid rgba(209, 213, 219, 0.3)
        
        "
        v-if="width_demension >= 1024"
    >

        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="70" height="70" viewBox="0 0 212 189"><g fill="none" fill-rule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"/><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"/><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"/><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"/><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"/><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"/><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"/><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"/><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"/><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"/><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"/><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"/><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"/><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"/><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"/><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"/><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"/><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"/><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"/><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"/><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"/><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"/><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"/><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"/><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"/><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"/><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"/><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"/><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"/><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"/></g></g></svg>



            <v-tabs
            color="primary"
            icons-and-text
            v-model="activeTab"
            >
                <v-tab v-for="tab in routes" :key="tab.id" :to="tab.link" style="text-transform:none;">
                     
                    {{ tab.title }}

                    <v-icon small class="mr-1">{{tab.icon}}</v-icon>
                </v-tab>

                <v-tabs-items v-model="activeTab" @change="updateRouter($event)">
                    <v-tab-item v-for="tab in routes" :key="tab.id" :to="tab.link">
                        <router-view />          
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>


        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            v-if="user.length != 0"
            text
            rounded
            style="
            text-transform:none;
            "
            v-bind="attrs"
            v-on="on"
            >
                <v-avatar
                size="30"
                class="mr-2"
                >
                    <v-img
                    :src="user.attributes.profilepic._url"
                    >
                    </v-img>
                </v-avatar>
                {{user.attributes.username}}
            </v-btn>
        </template>
            <v-list rounded>
                <v-list-item to="/profile">
                <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="logout_metamask()">
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
        

        <v-btn icon class="mx-1" v-if="user.length != 0" to="/message">
            <v-icon>mdi-message-processing-outline</v-icon>
        </v-btn>

        <v-icon class="mx-1" v-if="user.length != 0" @click.stop="drawer = !drawer">
            mdi-bell-outline
        </v-icon>


        <v-btn
        icon
        v-if="user.length != 0"
        @click.stop="drawer = !drawer"
        >
            <v-icon class="mx-1">
                mdi-wallet-outline
            </v-icon>
        </v-btn>

        


        <v-btn icon class="mx-1" v-if="user.length != 0" to="/item/create">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn
        depressed
        icon
        to="/login"
        v-if="user.length == 0"
        >
        <v-icon class="mr-2">mdi-login</v-icon>
        </v-btn>
        

    </v-app-bar>

    <v-app-bar
        v-else
        clipped-left
        fixed
        app
        flat
        style="
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid rgba(209, 213, 219, 0.3)
        "
    >        

    <v-app-bar-nav-icon
    v-if="user.length != 0" 
    @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-spacer>
        <v-text-field
            prepend-inner-icon="mdi-magnify"
            label="Search"
            clearable
            rounded
            class="mt-7"
        ></v-text-field>
    </v-spacer>

        <v-icon class="mx-1">
            mdi-bell-outline
        </v-icon>


        <v-btn 
        icon
        v-if="user.length != 0"
        to="/message">

        
        <v-icon class="mx-1">
            mdi-message-processing-outline
        </v-icon>

        </v-btn>

        

    </v-app-bar>





    <Swap :dialog="swap_dialog" v-on:emitEvent="swap_emit($event)"/>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import Moralis from 'moralis'
    import Swap from '~/components/crypto/swap.vue'
    export default {
        props: {
            width_demension : 0
        },
        components:{
            Swap
        },
        computed:{
            ...mapState(['user','ETHBalance','userETH']),

            
            isNotIndex : function (){
                return $nuxt.$route.name == 'index' || $nuxt.$route.name == 'message' || $nuxt.$route.name == 'market' ? true : false
            }
        },

        data () {
            return {
            swap_dialog: false,
            balance: undefined,
            activeTab: '',
            routes: [
            {
                id: 1,
                title: 'Home',
                icon: 'mdi-home',
                link: '/'
            },
            {
                id: 2,
                title: 'Market',
                icon: 'mdi-storefront-outline',
                link: '/market'
            },
            {
                id:3,
                title: 'Crypto',
                icon: 'mdi-chart-bell-curve',
                link: '/crypto'
            }
            
            ],
            drawer:true,
            items: [
                {
                icon: 'mdi-account',
                title: 'Account',
                to: '/account'
                },
                {
                icon: 'mdi-logout',
                title: 'Logout',
                to: '/logout'
                }
            ],
            miniVariant: true,
            right: false,
            rightDrawer: false,
            title: 'Crypto Bid'
            }
        },
        filters:{
            truncate_address : function (string){
                var startDigit = string.substring(0,7);
                var lastDigit = string.substr(string.length-5);
                return startDigit+"..."+lastDigit
            },
            truncate_balance : function (string){
                let balance = string.toString();
                var startDigit = balance.substring(0,8);
                return startDigit
            }
        },
        methods: {

            swap_emit : function (val) {
                return this.swap_dialog = val
            },

            updateRouter(val){
                this.$router.push(val)
            },

            async buy_crypto () {
                await Moralis.initPlugins();
                await Moralis.enable();
                Moralis.Plugins.fiat.buy()
            },


            async load_eth_balance(){
                
                
                const web3 = await Moralis.enable();
                const balances = await Moralis.Web3API.account.getNativeBalance(
                    {
                        chain: 'ropsten'
                    }
                );

                let currentBalance = web3.utils.fromWei(balances.balance, 'ether')

                this.balance = parseFloat(currentBalance).toFixed(4);
            },


            ...mapMutations(['authorize_loggin']),
            async logout_metamask() {
                await Moralis.User.logOut();
                this.authorize_loggin([]);
                this.$router.push('/')
            }
        },
        
        mounted () { 
            this.load_eth_balance()
        }
    }
</script>

