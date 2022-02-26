<template>
    <div>
        <div v-if="user.length != 0">


        
        <div  class="d-flex justify-center"
            elevation="12">
            <v-avatar
                color="primary"
                size="150"
                
            >
        
                <v-img alt="nawong.jpg"
                    :src ="user.get('profilepic')._url"
                ></v-img>
            
            </v-avatar>

            
        </div>
      
        <div class="d-flex justify-center mt-2">
            <h1>   {{ user.get('username')  }} </h1>
        </div>



        <div class="d-flex justify-center">
            <v-btn
                @click="copy_address"
                rounded
            >

                {{  user.get('ethAddress') | trim  }}
            </v-btn>
        </div>

        <div class="d-flex justify-center mt-2">
            <h6>
                {{ user.get('createdAt') | to_date }}
                <!-- {{ user.get('createdAt')}} -->
            </h6>
        </div>
            
         

        <v-card 
            class='pt-1 mt-3'
            color="#4DD0E1">
            

            <v-card>
                <v-tabs
                    class='d-flex justify-center'
                    v-model="active"    
                >
                    <v-tab>Posts</v-tab>
                    <v-tab>Items</v-tab>
                </v-tabs>

            </v-card>


        
            

            
            <div class="container" v-if="active==0">

                <div v-if="post.length == 0">
                    <v-card 
                        class='d-flex justify-center'
                    >
                       <h1>
                           No item found
                       </h1>
                    </v-card>
                </div>


                <v-row v-if="post.length != 0">
                    <v-col
                    v-for="(item , key) in post"
                    :key = key
                    col="5"
                    lg="4"
                    md="3"
                    sm="3"
                    >
                    
                        <Post
                            :postid="item"
                            :description="item.get('description')"
                            :date="item.createdAt" 
                            :profilepic="item.get('postedby').get('profilepic')._url"
                            :reaction="0"
                            :comment="0"
                            :username="item.get('postedby').get('username')"
                            :user="item.get('postedby')"
                            :ownerofthepost="isOwner(item.get('postedby').id)"
                            class="my-2"
                            :highlight="True"

                        />
                    
                    </v-col>
                
                </v-row>
            </div>


            <div class="container" v-if="active==1">

                <div v-if="item.length == 0">

                    <v-card 
                        class='d-flex justify-center'
                    >
                       <h1>
                           No item found
                       </h1>

                    </v-card>


                </div>
                
                <v-row v-if="item.length != 0">
                    <v-col
                    
                    v-for="(item , key) in item"
                    :key = key
                    col="5"
                    lg="4"
                    md="3"
                    sm="3"
                    >
                        <Preview
                                :Item="item"
                                :price="item.get('pesoprice')"
                                :seller="item.get('seller').get('username')"
                                :verified="item.get('seller').get('verified')"
                                :name="item.get('name')"
                                :img="item.get('previewimg')._url"
                                :coinname="item.get('tokenname')"
                                
                                :coin="item.get('token').logoURI"
                                :tokenprice="calculatePrice(item.get('token').name,item.get('pesoprice'))"/>
                        
                        
                    
                    </v-col>
                
                </v-row>
            


            </div>    
        </v-card> 


    </div>

    </div>
</template>

<script>

    import Preview from '~/components/showcaseitem/itemascard.vue'
    import Post from '~/components/post/post_card.vue';
    import Moralis from 'moralis';


    export default {

        components:{
        
            Post,
            Preview
        
        }
              
        ,
        data(){
            return {
                user     : [],
                username : this.$route.params.id,
                user_id  : "",
                post     : [],
                items    : [],
                aaa      :"",
                active   :0

            }

        },

        watch:{
            active : function (v){
                console.log(v);
            }
        },

        methods:{
            
            calculatePrice : function (token,price){


                for(const tokens in this.itemTokenPrice){
                    if(token.toLowerCase() == tokens){
                        
                        const calculate = price / this.itemTokenPrice[tokens].php

                        const tokenprice = calculate.toFixed(4)

                        return tokenprice
                    }
                }

            },

            async get_user(){
                //this.user = this.$route.params.id
                
                const params = {username:this.username}
                this.user  = await Moralis.Cloud.run("get_user" ,params );
                
                this.user_id = this.user.id
                console.log( this.user.id )
                console.log("--------user_id-------------")
                
                const params2 = { id: this.user.id }

                this.post = await Moralis.Cloud.run("get_user_post" ,params2 );
                this.item = await Moralis.Cloud.run("get_user_item" ,params2 );
                
                
                
                
            },

           

            copy_address : function ( address ){
                
                var text = this.user.get('ethAddress');

                this.$store.dispatch('snackbar/setSnackbar', {
                        text : "Address copied",
                        color : '#808081'
                    });


                navigator.clipboard.writeText(text).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                });
            
            },

            
            isOwner : function (user){
                return user == this.user.id ? true : false
            }

        },

        computed:{

        },

        mounted(){
            this.get_user()
            
        },

        filters:{

            trim: function ( address ) {
                
                address = address[0] + address[1] + address[2] + " ... " +  address[ address.length - 3 ] +  address[ address.length - 2 ] + address[address.length -1] 
                return address 
            },

            to_date: function ( created_at ) {

                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return "Joined " + months [ created_at.getMonth() ] +" "+ created_at.getFullYear();
            }

        
        }
        
    }
    
</script>

<style lang="scss" scoped>

</style>