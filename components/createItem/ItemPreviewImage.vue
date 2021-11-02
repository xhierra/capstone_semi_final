<template>
    <v-card
    color="transparent"
    outlined
    width="400"
    >
        <v-card-title>
            Item Image
        </v-card-title>
        <v-card-subtitle>
            image (PNG, JPG, or GIF) for the card display of your item.
        </v-card-subtitle>
        <v-card-text>

            <div class="image-upload-wrap">
                <div class="drag-text" v-if="image == null">
                     <h3 style="margin-top:70px;">
                         <v-icon
                         x-large
                         >
                             mdi-image
                         </v-icon>
                     </h3>
                </div>
                <div class="d-flex justify-center pa-1" v-else>
                    <v-img
                    height="290px" 
                    width="290px"
                    style="
                    border-radius:10px;
                    margin:auto;
                    "
                    v-if="url != null"
                    :src="url"/>
                </div>
            </div>

            <v-file-input
            accept="image/*"
            label="Upload Preview Image"
            hint="provide an image (PNG, JPG, or GIF) for the card display of your item."
            show-size
            @change="Preview_image"
            v-model="image"
            filled
            rounded
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
          url: null,
          image: null,
        }
    },

    methods: {

      Preview_image() {
        return this.url = this.image != null ?  URL.createObjectURL(this.image) : null
      },

      emitEvent : function (){
        this.$emit('emitEvent',this.image);
      }

    },

    watch:{
        image : function (){
            this.emitEvent()
        }
    }

  }
</script>

<style lang="scss" scoped>
.image-upload-wrap {
  height: 310px;
  width: 310px;
  border: 4px dashed gray;
  position: relative;
  border-radius:10px;
  
}


.drag-text {
  text-align: center;
}

.drag-text h3 {
  font-weight: 100;
  text-transform: uppercase;
  color: #15824B;
  padding: 60px 0;
}

</style>