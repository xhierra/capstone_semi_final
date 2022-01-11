<template>
    <div>
        <UserItemHold :hold="hold"/>
    </div>
</template>

<script>

    import UserItemHold from '~/components/profile/holds.vue'
    import Moralis from 'moralis'
    export default {
        components:{
            UserItemHold
        },
        data() {
            return {
                hold: []
            }
        },
        methods: {
            async init () {

                const Item = Moralis.Object.extend("Item");
                const query = new Moralis.Query(Item);
                query.equalTo("seller", Moralis.User.current());
                query.equalTo("market", false);
                query.find().then((Items) => {  
                    this.hold = Items
                }, (error) => {
                    console.log(error)
                })
            }
        },

        mounted() {
            this.init()
        },
    }
</script>

<style lang="scss" scoped>

</style>