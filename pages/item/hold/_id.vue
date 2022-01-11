
<template>
    <div>
        <!-- <Item
            :img="item.get('previewimg')._url"
            :name="item.get('name')"
            :category="item.get('category')"
            :id="item.id"
        /> -->
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
                item: []
            }
        },
        
        methods: {
            async init () {

                const Item = Moralis.Object.extend("Item");
                const query = new Moralis.Query(Item);
                query.equalTo("objectId", this.$route.params.id);
                const result = await query.first();


                console.log(result)

            },
        },
        mounted() {
            this.init()
        },
    }
</script>

<style lang="scss" scoped>

</style>