<template>
    <v-card
    color="transparent"
    outlined
    >
    <v-card-title>
        Item Availability
    </v-card-title>
    <v-card-subtitle>
        <b>Single item</b> if you're selling one item, show Only one on your listing / <b>In Stock</b> if you're selling more than one item, show In Stock on your listing
    </v-card-subtitle>
    <v-card-text>

        <v-select
            v-model="availability"
            label="Availability"
            :items="availability_cat"
            filled
            rounded
            type="number"
            min="1"
        ></v-select>

    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {

        availability: '',

        availability_cat: [
          'Single Item',
          'In Stock'
        ],

      }
    },
    methods: {
       emitEvent : function (){
            this.$emit('emitEvent',this.availability);
        } 
    },
    watch:{
        availability : function (){
            this.emitEvent();
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>