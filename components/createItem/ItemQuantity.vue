<template>
    <v-card
    color="transparent"
    outlined
    >
    <v-card-title>
        Item Quantity
    </v-card-title>
    <v-card-subtitle>
        The total supply of item to be able to purchase 
    </v-card-subtitle>
    <v-card-text>

        <v-text-field
            v-model="quantity"
            :rules="[rules.required,rules.minimum]"
            label="Quantity"
            filled
            rounded
            type="number"
            min="1"
        ></v-text-field>

    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {

        quantity: 1,
        
        rules: {
          required: value => !!value || 'This field is required',
          minimum: value => value >  0 || 'Minimum Supply is 1',
        },

      }
    },
    methods: {
       emitEvent : function (){
            this.$emit('emitEvent',this.quantity);
        } 
    },
    watch:{
        quantity : function (){
            this.emitEvent();
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>