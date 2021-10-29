<template>
    <div>
        test
    </div>
</template>

<script>
    import Moralis from 'moralis'
    export default {
        methods: {
            async init() {
                const params = { theURL: "Testing" }
                const response = await Moralis.Cloud.run("chatrooms",params);
                console.log(response)
            },
            
            
        },
        mounted() {
        this.init()
        },
    }
</script>

<style lang="scss" scoped>

</style>