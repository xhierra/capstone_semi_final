<template>
    <div class="container">
        <v-row>
            <v-col 
            v-for="(item,key) in 8"
            :key="key"
            col="12"
            lg="3"
            md="1"
            sm="4"
            >
                <Preview
                :price="itemprice"
                :seller="itemseller"
                :name="itemname"
                :img="itemimg"
                :coinname="itemcoinname"
                :coin="'https://assets.coingecko.com/coins/images/11939/thumb/shiba.png?1622619446'"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import Preview from '~/components/showcaseitem/itemascard.vue'
    import Moralis from 'moralis'
    export default {
        components:{
            Preview
        },

        data() {
            return {
                itemcoin:'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
                itemcoinname: 'Shiba',
                itemseller: 'DaChino',
                itemname: 'Testing',
                itemprice: 500,
                itemimg: 'https://c.tenor.com/WuoMkKg2dUcAAAAC/iphone-13.gif'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>