<template>
  <v-container class="pa-4 text-center">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <template v-for="(item, i) in hold">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >

            <Item
                :img="item.get('previewimg')._url"
                :name="item.get('name')"
                :category="item.get('category')"
                :id="item.id"
            />

        </v-col>
      </template>
    </v-row>
  </v-container>
</template>


<script>
  import Item from '~/components/showcaseitem/itemaspreview.vue'
  export default {

    components:{
        Item
    },

    props:{
        hold:{
            type: Array,
            default: {}
        }
    }
  }
</script>



