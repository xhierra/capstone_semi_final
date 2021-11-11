<template>
    <v-app style="
        background-color: #111927;
        background-image: 
        radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%), 
        radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%);
    ">
        <v-main>
            <Nuxt />
        </v-main>
        <TheSnackbar />
    </v-app>
</template>

<script>
    import TheSnackbar from '@/components/TheSnackbar.vue';
    export default {
        components:{
            TheSnackbar
        }
    }
</script>

<style lang="scss" scoped>

</style>