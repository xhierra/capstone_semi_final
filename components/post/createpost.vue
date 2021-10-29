<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          rounded
          depressed
          v-bind="attrs"
          v-on="on"
          class="mt-3"
          style="text-transform:none;"
        >
        <v-icon class="mr-1">
            mdi-post
        </v-icon>
        Create Post
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Create Post
          <v-spacer></v-spacer>
           <v-btn
            color="primary"
            icon
            @click="dialog = false"
          >
            <v-icon>
                mdi-close-circle-outline
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-subtitle>
            <v-file-input
            v-model="files"
            multiple
            accept="image/*"
            label="Add image"
            small-chips
            truncate-length="15"
            show-size
            ></v-file-input>
        </v-card-subtitle>

        <v-card-text>
            <v-textarea
            v-model="description"
            name="input-7-1"
            label="What's on your mind ?"
            outlined
            rounded
            :disabled="loads == true"
            ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :loading="loads == true"
            color="primary"
            :disabled="description == '' || loads == true"
            block
            rounded
            large
            @click="post()"
          >
          Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>



<script>
    import Moralis from 'moralis'
    export default {
        data () {
            return {
                loads: false,
                dialog: false,
                description: '',
                files: []
            }
        },

        methods: {
            async post () {

                const currentUser = Moralis.User.current();
                if (currentUser) {
                  this.loads = true
                  const CreatePost = await Moralis.Object.extend("Post");
                  const Post = new CreatePost();
                  Post.set("postedby", currentUser);
                  Post.set("description", this.description);
                
                  if (this.files.length != 0) {
                  
                    this.files.forEach(file => {
                      const upload = new Moralis.File(file.name, file);
                      const PostImage = new Moralis.Object("PostImages");
                      PostImage.set("postid", Post);
                      PostImage.set("image", upload);
                      PostImage.save();
                    });
                  }

                  Post.save()
                  this.loads = false
                } else {
                  console.log("You need to login")
                }
            }
        }

    }
</script>