<template>
    <v-dialog
      v-model="show"
      width="700"
    >
      
      <v-card>
        <v-card-title>
          Update Post
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            icon
            large
            @click.stop="show=false"
          >
            <v-icon>
                mdi-close-circle-outline
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-subtitle>
        <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">Markdown</a> syntax is supported.
        </v-card-subtitle>

        <v-card-text>

      

          <v-textarea
            v-model="editDesc"
            name="input-7-1"
            label="What's on your mind ?"
            hide-details
            filled
            rounded
            :disabled="loads == true"
          ></v-textarea>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :loading="loads == true"
            color="primary"
            :disabled="editDesc == '' || loads == true"
            block
            rounded
            x-large
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
                toEdit: ''
            }
        },

        watch:{
          file : function(v){
            console.log(v)
          }
        },

        props: {
          value: Boolean,
          description: String,
          toUpdate: Object
        },

        computed: {
          show: {
            get () {
              return this.value
            },
            set (value) {
              this.$emit('input', value)
            }
          },

          editDesc: {
            get () {
              return this.description
            },
            set (v) {
                this.toEdit = v
              return v
            }
          }
        },

        methods: {
            async post () {

                console.log(this.toUpdate)
                if (Moralis.User.current()) {
                  this.loads = true
                 
                  const Post = this.toUpdate;
                  await Post.save({
                    description: this.toEdit
                  })
                  .then((save) => {
                   
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text : 'Update Success' + save.id,
                        color : 'success',
                        icon: 'mdi-check'
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
            }
        }

    }
</script>


<style>

.limitwidth{
  max-width: 200px;
}

</style>