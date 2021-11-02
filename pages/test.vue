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
        }
    }
</script>

<style lang="scss" scoped>

</style>