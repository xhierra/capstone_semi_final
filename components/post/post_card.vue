<template>
    <div>
        <v-row justify="space-around" v-if="isloading">
        <v-card
        width="900"
        v-for="(posts,key) in post"
        :key="key"
        outlined
        class="modified my-2"
        >
            <v-card-title>
                <v-avatar
                size="40"
                >
                    <img
                        :src="posts.attributes.postedby.attributes.profilepic._url"
                        alt="John"
                    >
                </v-avatar>
                <span class="ml-2">{{posts.attributes.postedby.attributes.username}}</span>
                <v-spacer/>
            
            </v-card-title>

            <v-card-subtitle>
                <small>{{posts.createdAt}}</small>
            </v-card-subtitle>

            <v-card-text class="px-5" style="height:auto;white-space: pre">
                {{posts.attributes.description}}
            </v-card-text>
            <v-card-actions>
                <v-btn icon>
                    <v-icon>
                        mdi-heart-outline
                    </v-icon>
                </v-btn>
                <span class="caption mr-2"> 3 </span>

                <v-btn icon>
                    <v-icon>
                        mdi-message-text-outline
                    </v-icon>
                </v-btn>
                <span class="caption"> 3 </span>
            </v-card-actions>
        </v-card>
        </v-row>
        <Preload v-if="!isloading"/>
    </div>
</template>

<script>
    import Moralis from 'moralis'
    import Preload from '~/components/post/skelleton_loading.vue'
    export default {
        components:{
            Preload
        },
        data() {
            return {
                post: [],
                isloading: false,
            }
        },

        methods: {
            async fetch_post () {
                this.isloading = false;
                const Post = Moralis.Object.extend("Post");
                const Images = Moralis.Object.extend("PostImages");


                const query = new Moralis.Query(Post);
                query.include("postedby");
                const query2 = new Moralis.Query(Images);


                query2.matchesQuery("postid", query);
                // comments now contains the comments for posts with images.
                const PostList = await query.find();
                const PostImages = await query2.find();


                this.post = PostList;
                console.log(this.post)
                console.log(PostImages)
                this.isloading = true;
            }
        },

        mounted() {
            this.fetch_post();
        },
    }
</script>

<style lang="scss" scoped>
.modified{

    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);

}
</style>