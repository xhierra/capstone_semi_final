<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${(index * 70) + 20}px`"
      top
      right
    >
      <v-icon
      medium
      class="mr-2"
      >
        {{snackbar.icon}}
      </v-icon>



      {{snackbar.text}}


      <!-- <v-btn
      icon
      x-small
      class="float-right"
      @click="snackbar.showing = false">
        <v-icon>
          mdi-close-thick
        </v-icon>
      </v-btn> -->


      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          v-bind="attrs"
          @click="snackbar.showing = false"
        >
          <v-icon>
            mdi-close-thick
          </v-icon>

        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        snackbars: state => state.snackbar.snackbars
      })
    },    
  }
</script>

<style lang="scss" scoped>

</style>