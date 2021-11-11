<template>
    <div class="container">
            <v-tabs
            center-active
            show-arrows
            >
                <v-tab>
                    <v-icon class="mr-1">mdi-account-heart</v-icon>
                    Following
                </v-tab>

                <v-tab>
                    <v-icon class="mr-1">mdi-trending-up</v-icon>
                    Trending topics
                </v-tab>

                <v-tab>
                    <v-icon class="mr-1">mdi-fire</v-icon>
                    Hot topics
                </v-tab>

            </v-tabs>
        
        

            <Navs />

            <CreatePost/>

            <PostCard class="my-2"/>
    </div>
</template>

<script>
    import Navs from '~/components/post/nav_post.vue'
    import CreatePost from '~/components/post/createpost.vue'
    import PostCard from '~/components/post/post_card.vue'
    export default {
        components:{
            Navs,
            CreatePost,
            PostCard
        }
    }
</script>

<style lang="scss" scoped>

</style>