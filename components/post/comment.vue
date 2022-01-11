<template>
    <div>
        
        <div class="container">
            <span class="overline" style="text-transform:none;">{{postcomment.length}} Comment</span>
        </div>

        <div class="d-flex flex-row container">

            <v-avatar
                size="50"
                class="mr-2"
                v-if="you != undefined"
            >
                <img
                    :lazy-src="you.get('profilepic')._url"
                    :src="you.get('profilepic')._url"
                >
            </v-avatar>

            <v-textarea
                small
                auto-grow
                rows="1"
                row-height="15"
                filled
                rounded
                :label="toReply != undefined ? 'Replying to ' + toReply.get('username') : 'Write a comment'"
                hide-details
                v-model="comment"
                @keyup.enter="addComment()"
            />

        </div>

      

            <div
            v-for="(post,key) in postcomment"
            :key="key"
            class="mb-2"
            >
                <div class="d-flex flex-row">

                    <v-container fluid>
                        <Card :initcomments="initcomments" :objComment="post" class="my-2"/>
                    </v-container>
                    
                </div>
            </div>


    </div>
</template>

<script>
    import Moralis from 'moralis'
    import Card from '~/components/post/commentCard.vue'
    import moment from 'moment'
    export default {


        props:[
            'initcomments',
            'postobject'
        ],

        components:{
            Card
        },

        

        data() {
            return {
                comment: '',
                postcomment: [],
                dialogDelete: false,
                editedIndex: -1,
                editedItem: {},
                defaultItem:{},
                you: undefined,
                initload: false,
                initComment: false,


                toReply: undefined,
            }
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

                    this.you = Moralis.User.current();

                    console.log(this.you)

                    this.initload = true;
                }
            },
        },

        methods: {
            
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },


            async reply(user){
                return this.toReply = user;
            },

            async deleteComment () {
                    

                    if(Moralis.User.current()){

                        this.postcomment.splice(this.editedIndex, 1) //Delete from object


                        const Comment = Moralis.Object.extend("PostComment")
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
              let query = new Moralis.Query('PostComment');
              let subscription = await query.subscribe();
              subscription.on('create', (object) => {
                  if(object.get("postid") == this.postobject.id){
                    this.postcomment.push(object)
                  }
              })

              subscription.on('delete', (object) => {
                  if(object.get("postid") == this.postobject.id){
                    
                    
                    const Post = this.postobject;
                    Post.decrement("commentcount");
                    Post.save();
                    
                    this.editedIndex = this.postcomment.indexOf(object)
                    this.postcomment.splice(this.editedIndex, 1)
                  }
              })
            },

            async addComment (){
                if(this.comment.trim() != ''){
                    const Comment =  Moralis.Object.extend("PostComment");
                    const creaeComment = new Comment();
                    if (Moralis.User.current()) {

                    await creaeComment.save({
                        postid: this.postobject.id,
                        user: Moralis.User.current(),
                        comment: this.comment.trim(),
                        replied: this.toReply
                    })
                    .then((save) => {


                        const Post = this.postobject;
                        Post.increment("commentcount");
                        Post.save();

                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : 'Added comment at post ' + save.id,
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
        border: 0;

    }

</style>