<template>
    <div v-if="user.length != 0">

    
     
    

    <div
        class="d-flex flex-row mb-6"
    >
        <v-avatar
            class = "ma-8"
            
            color="primary"
            size="250"
            elevation="12"
        >
    
            <v-img alt="nawong.jpg"
                :src ="user.get('profilepic')._url"
            ></v-img>
        
        </v-avatar>




        <div>
    
            <h1 class= "mt-15 ml-4">   {{ user.get('username')  }} </h1>

            <v-btn
                @click = "copy_address"
                rounded
            >

                {{  user.get('ethAddress') | trim  }}

            </v-btn>


            <div v-for="(item , key) in post"
                :key = key>

                <h6 class= "mt-15 ml-4">   {{ item.get('description')  }} </h6>

            </div>
            

            

        </div>


    </div>

    


    
    
    
    
    
    
    
    
    
    </div>
</template>

<script>
    import Moralis from 'moralis';


    export default {
        data(){
            return {
                user : [],
                post : [],
                aaa :""

            }

        },

        methods:{

            async get_user(){
                this.user = Moralis.User.current();
            },

           

            copy_address : function ( address ){
                
                var text = this.user.get('ethAddress');

                navigator.clipboard.writeText(text).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                });
            
            },

            async get_post(){

                const params = { id: Moralis.User.current().id }
                this.post = await Moralis.Cloud.run("get_user_post" ,params );
                console.log(this.post)
            }

        },

        computed:{

        },

        mounted(){
            this.get_user(),
            this.get_post()

        },

        filters:{


            trim: function ( address ) {
                
                address = address[0] + address[1] + ".." + address[ address.length - 2 ] + address[address.length -1] 
                return address 
            }


        }
        
    }
</script>

<style lang="scss" scoped>

</style>