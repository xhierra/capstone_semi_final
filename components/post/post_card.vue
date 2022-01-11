<template>

<div>
    <v-hover
    v-slot="{ hover }"
>

    <v-card
        :elevation="hover ? 1 : 0"
        outlined
        class="modified mx-auto my-3"
        max-width="900"
    >

        <v-card-title class="overline">

                

                <v-badge
                    left
                    avatar
                    overlap
                    v-if="user.attributes.verified"
                >
                    <template v-slot:badge>
                    <v-avatar
                    >
                        <v-icon>
                            mdi-check-decagram
                        </v-icon>
                    </v-avatar>
                    </template>

                    <v-avatar
                    size="30"
                    >
                        <img
                            :lazy-src="profilepic"
                            :src="profilepic"
                        >
                    </v-avatar>
                </v-badge>

                <v-avatar
                    v-if="!user.attributes.verified"
                    size="30"
                >
                        <img
                            :lazy-src="profilepic"
                            :src="profilepic"
                        >
                </v-avatar>

                <span class="ml-2" style="text-transform:none">{{username}}</span>


                <v-spacer/>


                <v-menu 
                rounded="b-xl"
                content-class="elevation-1"
                v-if="showcase == false"
                offset-x>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon>
                                mdi-dots-horizontal
                            </v-icon>
                        </v-btn>
                    </template>

                    <v-list
                    rounded
                    >
                        <v-list-item
                        v-if="!ownerofthepost"
                        @click.once="reportPost()"
                        style="cursor:pointer"
                        >
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-alert-outline
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Report Post
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item
                            v-if="ownerofthepost"
                            @click.stop="dialog=true"
                        >
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-pencil-outline
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Edit Post
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item
                            v-if="ownerofthepost"
                        >
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-delete-outline
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Delete Post
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>

                </v-menu>

        </v-card-title>

        <v-card-subtitle>
            <v-icon
            class="mr-1"
            x-small
            >
                   mdi-clock-outline
            </v-icon>
            <small>{{date | timeAgo}}</small>
        </v-card-subtitle>


        <v-card-text
            v-if="showcase == false"
            v-html="readDescription(description)">
        >
        </v-card-text>

        <v-card-text
            v-else
        >
            <small>
                {{description}}
            </small>
        </v-card-text>

        <v-card-actions
        v-if="showcase == false"
        >



            <v-btn
            v-if="initReact"
            @click="heartReact()"
            :color="youalreadylike ? 'pink' : 'black'"
            icon>
                <v-icon>
                    {{hearticon}}
                </v-icon>
            </v-btn>

            <span class="caption mr-2" v-if="!initReact"> 
                <v-progress-circular
                    size="10"
                    width="1"
                    indeterminate
                    color="primary"
                ></v-progress-circular>    
            </span>
            <span class="caption mr-2" v-else>

                <v-menu
                rounded="lg"
                open-on-hover
                content-class="elevation-1"
                offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        text
                        rounded
                        style="text-transform:none"
                        v-bind="attrs"
                        v-on="on"
                        >
                        {{likes.count}}
                        </v-btn>
                    </template>
                    <v-list
                    rounded
                    v-if="likes.results.length != 0"
                    >
                        <v-list-item
                        v-for="(item, index) in likes.results"
                        :key="index"
                        >
                        <v-list-item-avatar>
                            <v-avatar
                                size="30"
                            >
                                <img
                                    :lazy-src="item.attributes.profilepic._url"
                                    :src="item.attributes.profilepic._url"
                                >
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-title>
                            
                            {{item.get('username')}}
                        </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </span>

            <v-btn
            rounded
            style="text-transform:none"
            @click="show = !show"
            text>
                <v-icon
                class="mr-1"
                >
                   mdi-comment-text-outline
                </v-icon>

                <span
                class="text--grey"
                > {{postid.get('commentcount')}} </span>
            </v-btn>

            
        </v-card-actions>

        <v-card-actions v-else>
           

            <span class="caption mr-2">

                <v-btn
                    readonly
                    text
                    rounded
                    style="text-transform:none"
                    x-small
                >
                    <v-icon x-small>
                        mdi-heart
                    </v-icon>
                        {{postid.get("heartcount")}}
                </v-btn>

            </span>

            <v-btn
             readonly
            text
            rounded
            style="text-transform:none"
            x-small>
                <v-icon
                x-small
                >
                   mdi-comment-text
                </v-icon>

                <span
                class="text--grey"
                > {{postid.get('commentcount')}} </span>

            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <Comment
                :initcomments="show"
                :postobject="postid"
                />
            </div>
        </v-expand-transition>

    </v-card>

</v-hover>





<Updatepost
:description="description"
:toUpdate="postid"
v-model="dialog"/>

</div> 

</template>

<script>

    var markdown = require( "markdown" ).markdown;
    import Updatepost from '~/components/post/updatepost.vue'
    import Comment from '~/components/post/comment.vue'
    import Moralis from 'moralis'
    import moment from 'moment'
    export default {
        

        components:{
            Updatepost,
            Comment
        },

        props:[
            'postid',
            'description',
            'date',
            'profilepic',
            'reaction',
            'comment',
            'username',
            'user',
            'ownerofthepost',
            'value',
            'highlight'
         ],

        data() {
            return {
                dialog: false,
                currentUser: undefined,
                likes:[],
                youalreadylike: undefined,
                initReact: false,
                showcase: false,
                show:false,
            }
        },

        filters:{
            timeAgo : function (time){
                return moment(time).startOf('hour').fromNow()
            }
        },

        computed:{
            hearticon: function (){
                return this.youalreadylike ? "mdi-heart" : "mdi-heart-outline"
            }
        },
        

        methods: {


            readDescription: function (str){
                return markdown.toHTML( str )
            },


            async reportPost(){
                const Post = this.postid;
                const relation = Post.relation("report");
                relation.add(Moralis.User.current());
                Post.save();

                this.$store.dispatch('snackbar/setSnackbar', {
                    text : "Post Reported",
                    color : 'error'
                });
            },



            async heartReact () {
                const Post = this.postid;
                const relation = Post.relation("likes");

                if(this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined){
                    
                    relation.add(Moralis.User.current());
                    Post.increment("heartcount")
                    Post.save();

                    

                    this.likes.count++;
                    this.likes.results.push(Moralis.User.current())

                    this.youalreadylike = true;
                }else{


                    relation.remove(Moralis.User.current());
                    Post.decrement("heartcount")
                    Post.save();

                    this.likes.count--;
                    const x = this.likes.results.findIndex(element => element.id == Moralis.User.current().id)
                    this.$delete(this.likes.results, x)
                    this.youalreadylike = false;
                }


                
            
                
            },


            async fetchReact () {
                const params =  { id: this.postid.id };

                const Post = await Moralis.Cloud.run("getPostReact",params);
                
                this.likes = Post;

                this.youalreadylike = this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined ? false : true;

                this.initReact = true
            },


            openmodal: function () {
                this.$emit('openmodal', true);
            },
        },

        mounted(){
            this.showcase = this.highlight;
            if(!this.showcase)
                this.fetchReact();
        }

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