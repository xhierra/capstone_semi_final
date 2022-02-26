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
                owned by {{ item.get('seller').id }}
            </v-text>

            <h4 class='mt-1' v-if="item.get('heartcount')==undefined">
                0 Hearts
            </h4>

            <h4 v-if="item.get('heartcount')!=undefined">
                {{ item.get('heartcount') }} Hearts
            </h4>

            
            <v-card class='pa-5' 
                color="">
                <div>
                    <h4>
                        Current price 
                    </h4>


                </div>
                

                <v-row>
                
                    <div class='ma-3'>
                        <h1>
                            PHP {{item.get('pesoprice')}}
                        </h1>   
                    </div>

                    <div class='ma-3 mt-4'>
                        <v-img
                            max-height="35"
                            max-width="35"
                            :src="item.get('token').logoURI ">
                        
                        </v-img>
                    </div>
                    <div class='mt-6'>
                        <h3>
                            {{  this.s  }}
                        </h3>
                    </div>
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
                    <p>
                        {{item.get('description')}}
                    </p>
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
                item : [],
                s    : ""

            }
    

        },

        methods:{
                     
            async convert( peso , id ){
                
                
                const send = await this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+`${id}`+'&vs_currencies=php');

                const respo = await send.data;

                
                this.s = peso / respo[id.toLowerCase()]['php']
                this.s = parseFloat(this.s).toFixed(4)
                console.log(this.s)
                

            },
            async get_item(){

                const params = { id: this.$route.params.id }
                const aaa = await Moralis.Cloud.run("get_view_item" ,params );
                this.item = aaa[0]
                console.log(this.item)
                this.convert( this.item.get('pesoprice') , this.item.get('token').name )
                
            },
        },

        mounted(){
            this.get_item()
        }

    }
    
</script>

<style lang="scss" scoped>

</style>