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
            <v-card
              :to="'/item/hold/'+item.id"
            >
                <v-img
                    :src="item.attributes.previewimg._url"
                    height="225px"
                >
                    <v-card-title class="text-h6 white--text">

                    <v-row
                        class="fill-height flex-column"
                        justify="space-between"
                    >

                        <p class="mt-4 subheading text-left">
                            {{item.attributes.name}}

                            {{item.attributes.previewimg._url}}
                        </p>

                    </v-row>

                    </v-card-title>
                </v-img>
                </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>


<script>
  export default {
    props:{
        hold:{
            type: Array,
            default: {}
        }
    }
  }
</script>



