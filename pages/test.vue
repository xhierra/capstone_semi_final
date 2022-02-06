<template>
    <div>
        <Snack
        :text="'Login'"
        :icon="'mdi-check-decagram'"
        :color="'warning'"
        />
    </div>
</template>

<script>
    import Snack from '~/components/snackbar.vue'
    export default {
        components:{
            Snack
        },



        data() {
            return {
                yawa:'yawa'
            }
        },



        
    }
</script>

<style lang="scss" scoped>

</style>