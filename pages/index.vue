<template>
    <div class="container">
           
        
        

            <Navs />

            <div class="d-flex justify-center">
                <v-text-field
                label="Whats in your mind?"
                class="customizefield"
                hide-details
                rounded
                filled
                readonly
                @click="openmodal = true"
                />
            </div>

            <CreatePost
            v-model="openmodal"
            />


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
                class="my-2"
                :highlight="false"/>
            </div>
            
            <div class="text-center">
                <v-btn
                text
                block
                rounded
                v-if="post.length != 0"
                @click="loadmore()"
                :loading="isloadmore"
                >
                    <template v-slot:loader>
                        <v-progress-circular
                        :size="20"
                        indeterminate
                        class="mr-2"
                        ></v-progress-circular>
                    </template>
                    load more..
                </v-btn>
            </div>

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

                isloading: false,
                isloadmore:false,



                openmodal: false,
                post: [],
                postImg: [],
                
                currentLogin: [],
                editPost: false,
                edit:[],
                page: 1,
                pagetoShow: 2
            } 
        },

    

        methods: {

            loadmore : function (){
                this.page++;
                this.fetch_post()
            },

            modal : function (modal) {
                return this.openmodal = modal;
            },


            fetch_post: _.debounce(async function(){


                this.isloadmore = true;

                    const params =  { page: this.page , pageSize: this.pagetoShow };
                    const Post = await Moralis.Cloud.run("getAllPost",params);
                    Post.results.forEach(element => {
                        this.post.push(element);
                    });
                
                this.isloadmore = false;


            },1000),

            initPost: _.debounce(async function(){

                this.isloading = false;

                 
                const params =  { page: this.page , pageSize: this.pagetoShow };

                const Post = await Moralis.Cloud.run("getAllPost",params);

                this.post = Post.results.reverse();

                this.isloading = true;

            },1000),


            isOwner : function (user){
                return user == this.currentLogin.id ? true : false
            },

        },


        mounted(){
            if(Moralis.User.current()){
                this.currentLogin = Moralis.User.current()
                this.initPost()
            }else{
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss" scoped>
.customizefield{
    max-width: 800px;
}
</style>