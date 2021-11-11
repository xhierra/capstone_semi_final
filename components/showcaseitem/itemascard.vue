<template>

    <v-hover
    v-slot="{ hover }"
    >
        <v-card
        :elevation="hover ? 5 : 0"
        class="modified"
        height="420"
        width="400"
        outlined
        >

            <v-img
            :lazy-src="img"
            :src="img"
            height="295"
            width="500"
            ></v-img>

            <v-card-text class="d-flex flex-row">
                <div>
                    {{seller}}
                    <v-tooltip top>
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
                    <h4>{{name}}</h4>
                    
                </div>

                <v-spacer></v-spacer>

                <div>
                    Price
                    <br>

                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-avatar
                        size="18"
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
                    </v-tooltip> <b>0.053</b>
                
                    
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
                </v-btn> <sup>3</sup>
            </v-card-actions>

        </v-card>
    </v-hover>
</template>

<script>
    export default {
        props:[
            'seller',
            'name',
            'img',
            'coin',
            'coinname',
            'price'
        ]
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