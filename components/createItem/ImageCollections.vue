<template>
    <v-card
    color="transparent"
    outlined
    width="400"
    >
        <v-card-title>
            Image Collection
        </v-card-title>
        <v-card-subtitle>
            Collection accepts (PNG, JPG, or GIF)
        </v-card-subtitle>
        <v-card-text>

            <v-row>
                <v-col
                v-for="(img,key) in url"
                :key="key"
                cols="4"
                >
                    <v-img
                    height="100px" 
                    width="100px"
                    style="
                    border-radius:10px;
                    margin:auto;
                    "
                    :src="img"/>
                </v-col>
            </v-row>

            <v-file-input
            accept="image/*"
            label="Upload Collection Images"
            hint="provide an image (PNG, JPG, or GIF) for the card display of your item."
            show-size
            @change="Preview_image"
            v-model="image"
            filled
            rounded
            multiple
            prepend-icon="mdi-image-plus"
            class="mt-2"
            ></v-file-input>

           
        </v-card-text>
    </v-card>
</template>

<script>
  export default {


    data() {
        return {
          url: [],
          image: [],
        }
    },

    methods: {

      Preview_image() {
        this.url = []
        if(this.image.length != 0){
          this.image.forEach(element => {
              this.url.push(URL.createObjectURL(element))
          });
        }else{
          this.url = []
        }

      },

      emitEvent : function (){
        this.$emit('emitEvent',this.image);
      }

    },

    watch:{
        image : function (){
            this.$emit('emitEvent',this.image);
        },
    }
  }
</script>
