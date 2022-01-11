<template>
    <div>
        <div class="d-flex flex-row">

            <div class="mr-2">
                <v-avatar
                    size="40"
                >

                    <img
                        :lazy-src="objReply.get('user').get('profilepic')._url"
                        :src="objReply.get('user').get('profilepic')._url"
                    />
                </v-avatar>
            </div>

            <div class="ml-3">

                <v-card
                    
                    width="530px"
                    elevation="0"
                    class="modified mb-2"
                    outlined
                >
                    <v-card-title style="font-size:1em">

                        {{objReply.get('user').get("username")}}

                        <v-spacer></v-spacer>

                            <v-menu
                            rounded="lg"
                            open-on-hover
                            content-class="elevation-1"
                            offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    icon
                                    x-small
                                    rounded
                                    style="text-transform:none"
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                        <v-icon>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list
                                rounded
                                >
                                    

                                    <v-list-item
                                        @click="deleteItem(objReply)"
                                        v-if="objReply.get('user').id == you.id"
                                    >
                                    <v-list-item-title>
                                        Delete
                                    </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item
                                        style="cursor:pointer"
                                        @click.once="report(objReply)"
                                        v-else
                                    >
                                    <v-list-item-title>
                                        Report
                                    </v-list-item-title>
                                    </v-list-item>

                                </v-list>
                            </v-menu>

                    </v-card-title>

                    <v-card-subtitle>
                        {{objReply.get("createdAt") | timeAgo}}
                    </v-card-subtitle>

                    <v-card-text class="black--text">
                        {{objReply.get('comment')}}
                    </v-card-text>
                </v-card>

                <span>


                    <v-btn
                    @click="hideorshowReply()"
                    text
                    class="caption"
                    style="text-transform: none;"
                    >
                            {{hideicon}}
                    </v-btn>

                    <v-btn
                    v-if="initReact"
                    @click="heartReact()"
                    text
                    class="caption"
                    style="text-transform: none;"
                    >
                        <v-icon
                        class="mr-2"
                        :color="youalreadylike ? 'pink' : 'black'"
                        >
                            {{hearticon}}
                        </v-icon>
                        {{objReply.get('heartcount')}} heart
                    </v-btn>

                    <v-btn
                    @click="showBox = true"
                    text
                    class="caption"
                    style="text-transform: none;"
                    >
                        <v-icon
                        class="mr-2"
                        >
                            mdi-reply-outline
                        </v-icon> 
                        Reply to 
                        <span v-if="objReply.get('user').id != you.id">{{objReply.get('user').get('username')}}</span>
                        <span v-else>your self</span>
                    </v-btn>

                    

                </span>

                <div v-if="showBox">

                    <v-card 
                    outlined
                    class="my-3 modified">
                        <v-card-text>
                            <v-textarea
                            label="Write here"
                            hide-details
                            v-model="comment"
                            />
                        </v-card-text>
                    </v-card>

                    <v-btn
                    :disabled="comment == ''"
                    @click="addComment()"
                    depressed
                    color="primary"
                    style="text-transform:none;"
                    >Submit</v-btn>

                    <v-btn
                    @click="showBox = false"
                    depressed
                    style="text-transform:none;"
                    text
                    >Dismissed</v-btn>

                </div>

            </div>

        </div>

        <div v-if="postreply.length != 0" class="my-3">
            <div 
                v-for="(item,key) in postreply"
                :key="key"
            >
                <ReplyCard :mainobj="objReply" :objReply="item" class="ml-8 my-3"/>

            </div>
        </div>
        

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Delete Comment?</v-card-title>
                    <v-card-text>
                        Are you sure you want to delete this comment?
                    </v-card-text>

                    <v-card-actions>

                    <v-spacer/>

                    <v-btn color="blue darken-1" text @click="closeDelete">No</v-btn>
                    <v-btn color="primary" dark depressed  @click="deleteItemConfirm">Delete</v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Moralis from 'moralis'
    import moment from 'moment'
    import ReplyCard from '~/components/post/reReplyCard.vue'
    export default {


        props:[
            'objReply'
        ],

        components:{
            ReplyCard
        },
        
        data() {
            return {

                showBox: false,

                hideReply: false,

                initReact: false,
                likes:[],
                youalreadylike: undefined,

                comment: '',
                postcomment: [],
                postreply: [],
                dialogDelete: false,
                editedIndex: -1,
                editedItem: {},
                defaultItem:{},
                you: [],
                initload: false,
                initComment: false,

            }
        },

        computed:{
            hearticon: function (){
                return this.youalreadylike ? "mdi-heart" : "mdi-heart-outline"
            },

            hideicon: function (){
                return this.hideReply ? "Show" : "Hide"
            }

        },

        filters:{
            timeAgo : function (time){
                return moment(time).startOf('hour').fromNow()
            }
        },

        mounted(){
            this.initSocket();
            this.fetchReact();
            this.fetchReply();
            this.you = Moralis.User.current();
        },

        watch:{
            initcomments : function (boolean){
                if(boolean == true){

                    /**
                     * load socket if first click
                     * disabled initload when is true;
                     */
                    
                    if(!this.initload){
                        this.initSocket()
                    }
                    
                    this.init();

                    this.fetchReact()

                    this.you = Moralis.User.current();

                    console.log(this.you)

                    this.initload = true;
                }
            },
        },

        methods: {

            async hideorshowReply (){
                if(!this.hideReply){
                    this.postreply = []
                    this.hideReply = true;
                }else{
                    this.fetchReply()
                    this.hideReply = false;
                }
            },

            async report(object){
                const Comment = object;
                const relation = Comment.relation("report");
                relation.add(Moralis.User.current());
                Comment.increment("reportcount")
                Comment.save();
                this.$store.dispatch('snackbar/setSnackbar', {
                    text : "Comment Reported",
                    color : 'error'
                });
            },


            async fetchReact () {
                const params =  { id: this.objReply.id };

                const Post = await Moralis.Cloud.run("getReplyReact",params);
                
                this.likes = Post;

                this.youalreadylike = this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined ? false : true;

                this.initReact = true
            },

            async fetchReply () {


                const params =  { id: this.objReply.id };

                const Reply = await Moralis.Cloud.run("getPostReply",params);
                
                this.postreply = Reply;

                console.log(Reply);

            },


            async heartReact () {


                const Heartreact = this.objReply;
                const relation = Heartreact.relation("likes");

                if(this.likes.results.find(element => element.id == Moralis.User.current().id) == undefined){
                    
                    relation.add(Moralis.User.current());
                    Heartreact.increment("heartcount")
                    Heartreact.save();

                    

                    this.likes.count++;
                    this.likes.results.push(Moralis.User.current())

                    this.youalreadylike = true;
                }else{


                    relation.remove(Moralis.User.current());
                    Heartreact.decrement("heartcount")
                    Heartreact.save();

                    this.likes.count--;
                    const x = this.likes.results.findIndex(element => element.id == Moralis.User.current().id)
                    this.$delete(this.likes.results, x)
                    this.youalreadylike = false;
                }
                
            },
            
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            async deleteComment () {
                    

                    if(Moralis.User.current()){


                        const Comment = Moralis.Object.extend("PostReply")
                        const comment = new Comment();
                        comment.unset(this.editedItem);
                        await comment.destroy();
                        
                    }else{
                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : "You need to login",
                            color : 'error'
                        });
                    }
            },

            deleteItem (item) {
                this.editedIndex = this.postcomment.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            async deleteItemConfirm () {
                this.deleteComment()
                this.closeDelete()
            },

            async init (){

                this.initComment = false

                const params =  { id: this.postobject.id };
                const Comments = await Moralis.Cloud.run("getPostComment",params);
                this.postcomment = Comments;

                this.initComment = true;
            },

            async initSocket() {

                let query = new Moralis.Query('PostReply');
                let subscription = await query.subscribe();

                subscription.on('create', (object) => {
                    if(object.get("commentid") == this.objReply.id){
                        this.postreply.push(object)
                    }
                })

                subscription.on('delete', (object) => {
                    if(object.get("commentid") == this.objReply.id){
                        const Post = this.objReply;
                        Post.decrement("replycount");
                        Post.save();
                        
                        this.editedIndex = this.postreply.indexOf(object)
                        this.postreply.splice(this.editedIndex, 1)
                    }
                })

            },

            async addComment (){
                if(this.comment.trim() != ''){
                    const Comment =  Moralis.Object.extend("PostReply");
                    const creaeComment = new Comment();
                    if (Moralis.User.current()) {

                    await creaeComment.save({
                        commentid: this.objReply.id,
                        user: Moralis.User.current(),
                        comment: this.comment.trim(),
                        replied: this.objReply.get('user')
                    })
                    .then((save) => {


                        const objReply = this.objReply;

                        const relation = objReply.relation("reply");
                        relation.add(save);


                        objReply.increment("replycount");
                        objReply.save();

                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : 'Added reply at comment ' + save.id,
                            color : 'primary',
                        });
                        
                    }, (error) => {
                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : error.message,
                            color : 'error'
                        });
                    });
                    
                    
                    this.loads = false
                    } else {
                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : "You need to login",
                            color : 'error'
                        });
                    }

                    this.comment = '';
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    .modified{

        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        border-radius: 12px;
        border: 1;

    }

</style>