<template>
    <v-card
    color="transparent"
    outlined
    >
    <v-card-title>
        Name
    </v-card-title>
    <v-card-text>

        <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Item Name"
            filled
            rounded
        ></v-text-field>

    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        rules: {
          required: value => !!value || 'This field is required'
        },
      }
    },
    methods: {
       emitEvent : function (){
            this.$emit('emitEvent',this.name);
        } 
    },
    watch:{
        name : function (){
            this.emitEvent();
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>