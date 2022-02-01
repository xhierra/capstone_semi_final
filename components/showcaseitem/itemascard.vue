<template>

    <v-hover
    v-slot="{ hover }"
    >
        <v-card
        :elevation="hover ? 1 : 0"
        class="modified"
        height="427"
        width="400"
        outlined
        >

            <v-img
            :lazy-src="img"
            :src="img"
            height="295"
            width="500"
            >
                <div class="pa-2">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar
                            size="30"
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-img
                                :src="coin"
                                >
                                </v-img>
                            </v-avatar>
                        </template>
                        <span>{{coinname}}</span>
                    </v-tooltip>

                </div>

            </v-img>

            <v-card-text class="d-flex flex-row ">

                <div class="align-self-sm-start">

                    {{seller}}


                    <v-tooltip top v-if="verified">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                        small
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        >
                            mdi-check-decagram
                        </v-icon>
                    </template>
                    <span>Safe to Transact</span>
                    </v-tooltip>

                    
                    <br>

                    <!-- Item Name -->
                    

                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <h4 
                        class="d-inline-block text-truncate"
                        style="max-width: 150px;"
                        v-bind="attrs"
                        v-on="on">
                        {{name}}</h4>
                    </template>
                    <span>{{name}}</span>
                    </v-tooltip>

                    <!-- Item Name -->
                    
                </div>
                
                <v-spacer></v-spacer>

                <div class="align-self-auto">
                    <span >Price</span><br>
                    <b>
                        P{{price}}
                        <v-icon x-small>mdi-slash-forward</v-icon>

                        <span v-if="tokenprice == null">
                            <v-progress-circular
                                size="20"
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                        </span>

                        <span v-else>{{tokenprice}}</span>

                    </b>
                </div>

                
            </v-card-text>

            <v-card-actions>
                <v-btn
                text
                rounded
                >
                    BUY
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                v-if="initReact"
                @click="heartReact()"
                :color="youalreadylike ? 'pink' : 'black'"
                icon>
                    <v-icon>
                        {{hearticon}}
                    </v-icon>
                    <small>{{Item.get('heartcount')}}</small>
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-hover>
</template>

<script>
    import Moralis from 'moralis'
    export default {

        props:[
            'Item',
            'seller',
            'verified',
            'name',
            'img',
            'coin',
            'coinname',
            'price',
            'tokenprice'
        ],

        computed:{
            hearticon: function (){
                return this.youalreadylike ? "mdi-heart" : "mdi-heart-outline"
            }
        },

        data() {
            return {
                isloading: false,
                youalreadylike: undefined,
                initReact: false,
                likes:[]
            }
        },

        methods:{

            async fetchReact () {
                const params =  { id: this.Item.id };

                const Items = await Moralis.Cloud.run("getItemReact",params);
                
                this.likes = Items;

                this.youalreadylike = this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined ? false : true;

                this.initReact = true
            },

            async heartReact () {

                
                const Items = this.Item;
                const relation = Items.relation("likes");

                if(this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined){
                    
                    relation.add(Moralis.User.current());
                    Items.increment("heartcount")
                    Items.save();

                    

                    this.likes.count++;
                    this.likes.results.push(Moralis.User.current())

                    this.youalreadylike = true;
                }else{


                    relation.remove(Moralis.User.current());
                    Items.decrement("heartcount")
                    Items.save();

                    this.likes.count--;
                    const x = this.likes.results.findIndex(element => element.id == Moralis.User.current().id)
                    this.$delete(this.likes.results, x)
                    this.youalreadylike = false;
                }
                
            },
        },
        mounted(){
            this.fetchReact();
        }
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