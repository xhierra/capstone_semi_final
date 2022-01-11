<template>
    <div>
        <v-navigation-drawer
        app
        clipped
        width="400"
        >
            <v-container>
            <Preloadcard v-if="!isloading"/>

            <div
                v-for="(posts,key) in post"
                :key="key"
            >
                <PostCard
                :postid="posts"
                :description="posts.attributes.description"
                :date="posts.createdAt"
                :profilepic="posts.attributes.postedby.attributes.profilepic._url"
                :reaction="0"
                :comment="0"
                :username="posts.attributes.postedby.attributes.username"
                :user="posts.attributes.postedby"
                :ownerofthepost="isOwner(posts.attributes.postedby.id)"
                :highlight="true"
                class="my-2"/>
            </div>
            </v-container>
        </v-navigation-drawer>

    </div>
</template>

<script>
    import Preloadcard from '~/components/post/skelleton_loading.vue'
    import Moralis from 'moralis'
    import Navs from '~/components/post/nav_post.vue'
    import CreatePost from '~/components/post/createpost.vue'
    import PostCard from '~/components/post/post_card.vue'
    import _ from 'lodash';
    export default {
        components:{
            Navs,
            CreatePost,
            PostCard,
            Preloadcard 
        },

        data() {
            return {

                openmodal: false,
                post: [],
                postImg: [],
                isloading: false,
                currentLogin: [],
                editPost: false,
                edit:[],
                page: 1,
                pagetoShow: 3,
                totalPage: 0
            } 
        },

        watch:{
            page : function (){
                this.fetch_post()
            }
        },

        methods: {

            modal : function (modal) {
                return this.openmodal = modal;
            },


            fetch_post: _.debounce(async function(){
                this.isloading = false;


                const params =  { page: this.page , pageSize: this.pagetoShow };

                const Post = await Moralis.Cloud.run("postHighLight",params);

                this.post = Post.reverse();
                this.totalPage = Math.round(Post.count / this.pagetoShow);

                this.isloading = true;
            },1000),


            isOwner : function (user){
                return user == this.currentLogin.id ? true : false
            },

            async initSocket() {
              let query = new Moralis.Query('Post');
              let subscription = await query.subscribe();
              subscription.on('create', (object) => {
                this.post.unshift(object)
              })
            }

        },


        mounted(){
            
                this.currentLogin = Moralis.User.current()
                this.fetch_post()
                this.initSocket()
        }
    }
</script>