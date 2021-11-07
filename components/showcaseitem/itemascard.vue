<template>

    <v-hover
    v-slot="{ hover }"
    >
    <v-card
    :elevation="hover ? 5 : 0"
    class="modified"
    height="500"
    width="400"
    outlined
    >

        <v-img
        :lazy-src="img"
        :src="img"
        height="400"
        width="500"
        ></v-img>

        <v-card-title>
            {{seller}}
            <v-spacer></v-spacer>
            Price
        </v-card-title>
        <v-card-subtitle>
            {{name}}
        </v-card-subtitle>
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