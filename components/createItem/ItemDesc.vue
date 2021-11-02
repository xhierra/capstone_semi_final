<template>
    <v-card
    color="transparent"
    outlined
    >
    <v-card-title>
        Description
    </v-card-title>
    <v-card-subtitle>
      The description will be included on the item's detail page underneath its image. <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">Markdown</a> syntax is supported.
    </v-card-subtitle>
    <v-card-text>

      <v-textarea
          filled
          rounded
          label="Description"
          hint="Provide a detailed description of your item"
          v-model="description"
      ></v-textarea>

    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
        description: ''
      }
    },
    methods: {
       emitEvent : function (){
            this.$emit('emitEvent',this.description);
        } 
    },
    watch:{
        description : function (){
            this.emitEvent();
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>