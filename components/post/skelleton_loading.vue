<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        v-for="(item,key) in 5"
        :key="key"
      >
        <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  export default {
    data: () => ({
      attrs: {
        class: 'my-2',
        boilerplate: false,
        elevation: 0,
        
      },
    }),
  }
</script>