<template>
<div v-if="item.length !=0" 
    class='d-flex justify-center'
    >

    
    <v-row class="ma-2 d-flex justify-center"> 
        <div>
            <v-card class="ma-2 pa-2"
                color="">
                <v-img
                    class="mb-2"
                    max-height="25"
                    max-width="25"
                    :src="item.get('token').logoURI ">
                
                </v-img>

                <v-img
                    max-height="400"
                    max-width="400"
                    :src="item.get('previewimg')._url">
                
                </v-img>
            </v-card>
        </div>

        <div class='ml-2'>
            <h1 class='mt-10'
                color='#B04C00'>
                {{item.get('name')}}
            </h1>

            <v-text class='mt-1'>
                owned by {{ item.get('seller').get('username') }}
            </v-text>

            <h4 class='mt-1' v-if="item.get('heartcount')==undefined">
                0 Hearts
            </h4>

            <h4 v-if="item.get('heartcount')!=undefined">
                {{ item.get('heartcount') }} Hearts
            </h4>

            
            <v-card class='pa-3' 
                color="">
                <h4>
                    Current price 
                </h4>

                <v-row>
                
                    <div class='ma-3'>
                        <h2>
                            PHP {{item.get('pesoprice')}}
                        </h2>   
                    </div>

                    <div class='ma-3'>
                        <v-img
                            max-height="35"
                            max-width="35"
                            :src="item.get('token').logoURI ">
                        
                        </v-img>
                    </div>
                    <h1>
        
                       
                    </h1>
                    
                </v-row>

                <v-btn
                    elevation="2"
                > BUY</v-btn>


            </v-card>
            
            <v-card class="mt-2 pa-3"
                color="">
                
                <div class="ma-2">
                    <h1>
                        Description
                    </h1>
                    {{item.get('description')}}
                
                </div>
            </v-card>



        </div>
    </v-row>


</div>
</template>

<script>
    import Moralis from 'moralis';



    export default {

        components:{
        
            
        },

        data(){

            return {
                item : []

            }
    

        },

        methods:{
                        
            async get_item(){

                const params = { id: this.$route.params.id }
                const aaa = await Moralis.Cloud.run("get_view_item" ,params );
                this.item = aaa[0]
                console.log(this.item)
            },
        },

        mounted(){
            this.get_item()
        }

    }
    
</script>

<style lang="scss" scoped>

</style>