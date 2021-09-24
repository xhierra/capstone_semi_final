<template>
    <div class="container">
        <Trending/>
        <Coinslist class="mt-2"/>
    </div>
</template>

<script>
    import Trending from '~/components/crypto/trending.vue'
    import Coinslist from '~/components/crypto/coinlist.vue'
    export default {
        components:{
            Trending,
            Coinslist
        }
    }
</script>

<style lang="scss" scoped>

</style>