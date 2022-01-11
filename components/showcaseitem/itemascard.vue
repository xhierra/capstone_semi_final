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
                icon
                rounded
                >
                    <v-icon>
                        mdi-heart-outline
                    </v-icon>
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-hover>
</template>

<script>
    export default {

        props:[
            'seller',
            'verified',
            'name',
            'img',
            'coin',
            'coinname',
            'price',
            'tokenprice'
        ],

        data() {
            return {
                isloading: false,
            }
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