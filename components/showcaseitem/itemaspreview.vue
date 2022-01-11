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
        :to="'/item/update/'+id"
        >

            <v-img
            :lazy-src="img"
            :src="img"
            height="295"
            width="500"
            >
            </v-img>

            <v-card-text class="text-center">

                <div>
                    

                    <!-- Item Name -->
                        <h5 class="overline">{{category}}</h5>

                        <h4>
                        {{name}}
                        </h4>

                    <!-- Item Name -->
                    
                </div>


                
            </v-card-text>

        </v-card>
    </v-hover>
</template>

<script>
    export default {
        props:[
            'name',
            'img',
            'category',
            'id'
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