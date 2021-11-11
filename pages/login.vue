<template>
    <div class="container" style="margin-top:150px">

        <div class="d-flex justify-center text-center">
            <v-sheet width="500" color="transparent">
            
            <svg class="logo" viewBox="0 0 960 300">

                <symbol id="logo-text">
                    <text text-anchor="middle" x="50%" y="80%">CrypInto</text>
                </symbol>

                <g>
                    <use xlink:href="#logo-text" class="logo-copy"></use>
                    <use xlink:href="#logo-text" class="logo-copy"></use>
                    <use xlink:href="#logo-text" class="logo-copy"></use>
                    <use xlink:href="#logo-text" class="logo-copy"></use>
                    <use xlink:href="#logo-text" class="logo-copy"></use>
                </g>
            </svg>

            <v-container>

                <v-btn
                class="font-weight-regular"
                x-large
                block
                color="primary"
                :loading="authorize_metamask"
                rounded
                style="text-transform: none;"
                @click="loginMetamask()"
                
                >

                <template v-slot:loader>
                    <v-progress-circular
                    :size="20"
                    indeterminate
                    class="mr-2"
                    ></v-progress-circular>
                        Authenticating
                </template>
                
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-5" width="40" height="40" viewBox="0 0 212 189"><g fill="none" fill-rule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"/><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"/><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"/><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"/><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"/><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"/><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"/><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"/><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"/><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"/><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"/><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"/><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"/><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"/><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"/><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"/><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"/><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"/><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"/><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"/><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"/><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"/><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"/><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"/><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"/><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"/><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"/><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"/><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"/><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"/></g></g></svg>
               

                {{metamask}}
                
                </v-btn>


                <v-btn
                class="font-weight-regular mt-5 white--text"
                x-large
                block
                color="red"
                :loading="authorize_walletConnect"
                rounded
                style="text-transform: none;"
                @click="loginWalletConnect()"
                
                >

                <template v-slot:loader>
                    <v-progress-circular
                    :size="20"
                    indeterminate
                    class="mr-2"
                    ></v-progress-circular>
                        Authenticating
                </template>
                
                <svg width="40" class="mr-5" height="40" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
                    <title>logo</title>
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <radialGradient cx="0%" cy="50%" fx="0%" fy="50%" r="100%" id="radialGradient-1">
                            <stop stop-color="#5D9DF6" offset="0%"></stop>
                            <stop stop-color="#006FFF" offset="100%"></stop>
                        </radialGradient>
                    </defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="logo">
                            <rect id="base" fill="url(#radialGradient-1)" x="0" y="0" width="512" height="512" rx="256"></rect>
                            <path d="M169.209772,184.531136 C217.142772,137.600733 294.857519,137.600733 342.790517,184.531136 L348.559331,190.179285 C350.955981,192.525805 350.955981,196.330266 348.559331,198.676787 L328.82537,217.99798 C327.627045,219.171241 325.684176,219.171241 324.485851,217.99798 L316.547278,210.225455 C283.10802,177.485633 228.89227,177.485633 195.453011,210.225455 L186.951456,218.549188 C185.75313,219.722448 183.810261,219.722448 182.611937,218.549188 L162.877976,199.227995 C160.481326,196.881474 160.481326,193.077013 162.877976,190.730493 L169.209772,184.531136 Z M383.602212,224.489406 L401.165475,241.685365 C403.562113,244.031874 403.562127,247.836312 401.165506,250.182837 L321.971538,327.721548 C319.574905,330.068086 315.689168,330.068112 313.292501,327.721609 C313.292491,327.721599 313.29248,327.721588 313.29247,327.721578 L257.08541,272.690097 C256.486248,272.103467 255.514813,272.103467 254.915651,272.690097 C254.915647,272.690101 254.915644,272.690105 254.91564,272.690108 L198.709777,327.721548 C196.313151,330.068092 192.427413,330.068131 190.030739,327.721634 C190.030725,327.72162 190.03071,327.721606 190.030695,327.721591 L110.834524,250.181849 C108.437875,247.835329 108.437875,244.030868 110.834524,241.684348 L128.397819,224.488418 C130.794468,222.141898 134.680206,222.141898 137.076856,224.488418 L193.284734,279.520668 C193.883897,280.107298 194.85533,280.107298 195.454493,279.520668 C195.454502,279.520659 195.45451,279.520651 195.454519,279.520644 L251.65958,224.488418 C254.056175,222.141844 257.941913,222.141756 260.338618,224.488222 C260.338651,224.488255 260.338684,224.488288 260.338717,224.488321 L316.546521,279.520644 C317.145683,280.107273 318.117118,280.107273 318.71628,279.520644 L374.923175,224.489406 C377.319825,222.142885 381.205562,222.142885 383.602212,224.489406 Z" id="WalletConnect" fill="#FFFFFF" fill-rule="nonzero"></path>
                        </g>
                    </g>
                </svg>

                {{walletconnect}}
                
                </v-btn>


            </v-container>

            </v-sheet>
        </div>




    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import Moralis from 'moralis';
    export default {
        layout: 'newuser',
        middleware: 'is_loggedin',
        data: () => ({
        authorize_metamask: false,
        authorize_walletConnect: false,
        metamask: 'Login with MetaMask',
        walletconnect : 'Login with Wallet Connect'
        }),
        methods:{
            ...mapActions(['loggedin']),
            async loginMetamask (){
                if(window.ethereum){

                    this.authorize_metamask = true;
                    try{

                      
                        let global = this;
                        Moralis.authenticate().then(function (user) {
                            global.set_User(user);
                            global.authorize_metamask = false;
                            global.loggedin();
                            global.$router.push('/')
                        }).catch (function (error){

                            global.$store.dispatch('snackbar/setSnackbar', {
                                text :  error.message,
                                color : 'error',
                                icon: 'mdi-alert-circle-outline'
                            });

                            global.authorize_metamask = false;
                        })

                    }catch{
                        this.authorize_metamask = false;
                    }
                }else{
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text :  "MetaMask not found please install",
                        color : 'purple',
                        icon: 'mdi-download-off'
                    });
                }
            },

            async loginWalletConnect (){
                if(window.ethereum){

                    this.authorize_walletConnect = true;
                    try{

                      
                        const user = await Moralis.authenticate({ 
                            provider: "walletconnect", 
                            mobileLinks: [
                            "rainbow",
                            "metamask",
                            "argent",
                            "trust",
                            "imtoken",
                            "pillar",
                            "binance"
                            ] 
                        })

                        if(user){
                            this.set_User(user);
                            this.authorize_walletConnect = false;
                            this.loggedin();
                            this.$router.push('/')
                        }else{
                            this.$store.dispatch('snackbar/setSnackbar', {
                                text :  "Failed to Login",
                                color : 'error',
                                icon: 'mdi-alert-circle-outline'
                            });
                        }

                    }catch{
                        this.authorize_walletConnect = false;
                    }
                }else{
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text :  "WalletConnect not found please install",
                        color : 'warning',
                        icon: 'mdi-download-off'
                    });
                }
            },

            set_User (token){
            this.$store.commit('authorize_loggin', token)
            },

        },
        computed:{
            ...mapState(['user'])
        },
        
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
.glass_effect{
    backdrop-filter: blur(0px) saturate(180%);
    -webkit-backdrop-filter: blur(0px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
}


.logo {
    
    font: 10.5em 'Permanent Marker';
}

.logo-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.logo-copy:nth-child(1){
	stroke: #4D163D;
	animation-delay: -1;
}

.logo-copy:nth-child(2){
	stroke: #840037;
	animation-delay: -2s;
}

.logo-copy:nth-child(3){
	stroke: #BD0034;
	animation-delay: -3s;
}

.logo-copy:nth-child(4){
	stroke: #BD0034;
	animation-delay: -4s;
}

.logo-copy:nth-child(5){
	stroke: #FDB731;
	animation-delay: -5s;
}

@keyframes stroke-offset{
	100% {stroke-dashoffset: -35%;}
}
</style>