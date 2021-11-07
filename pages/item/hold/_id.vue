<template>
    <div class="container">
        <v-row>
            <v-col 
            v-for="(item,key) in 4"
            :key="key"
            col="12"
            lg="4"
            md="2"
            >
                <Preview
                :seller="itemseller"
                :name="itemname"
                :img="itemimg"
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
                itemseller: '',
                itemname: '',
                itemimg: ''
            }
        },
        
        methods: {
            async init () {

                const Item = Moralis.Object.extend("Item");
                const query = new Moralis.Query(Item);
                query.equalTo("objectId", this.$route.params.id);
                query.find().then((Items) => {  
                    let item = Items[0];
                    this.itemseller = item.get('seller').get('username')
                    this.itemname = item.get('name')
                    this.itemimg = item.get('previewimg')._url;
                    console.log(item)
                }, (error) => {
                    console.log(error)
                })
            },
        },
        mounted() {
            this.init()
        },
    }
</script>

<style lang="scss" scoped>

</style>