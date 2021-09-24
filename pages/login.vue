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
                :loading="authorize"
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
                rounded
                style="text-transform: none;"
                >

                <v-icon
                class="mr-2"
                large
                >
                mdi-email
                </v-icon>

                {{locallogin}}
                
                </v-btn>


            </v-container>

            </v-sheet>
        </div>


        <v-snackbar
        v-model="walleterror"
        :timeout="2000"
        dark
        color="deep-purple accent-4"
        >
        <v-icon class="mr-2">mdi-robot</v-icon>
        {{ message }}

        <template v-slot:action="{ attrs }">
            <v-btn
            color="cyan accent-3"
            text
            v-bind="attrs"
            @click="walleterror = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>

    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import Moralis from 'moralis';
    export default {
        layout: 'newuser',
        middleware: 'is_loggedin',
        data: () => ({
        authorize: false,
        metamask: 'Login with MetaMask',
        locallogin : 'Login with email and password',
        walleterror: false,
        message: ''
        }),
        methods:{
            ...mapActions(['loggedin']),
            async loginMetamask (){
                if(window.ethereum){

                    this.authorize = true;
                    try{

                        let user = await Moralis.Web3.authenticate();
                   
                        if(user){
                            this.set_User(user);
                            this.authorize = false;
                            this.loggedin();
                            this.$router.push('/')
                        }

                    }catch{
                        this.authorize = false;
                    }
                }else{
                    this.message = "Please install MetaMask first";
                    this.walleterror = true;
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