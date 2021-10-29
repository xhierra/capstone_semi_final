<template>
    <v-dialog
        transition="dialog-top-transition"
        persistent
        max-width="600"
        v-model="active">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the top</v-toolbar>
            <v-card-text>
              <LineChart :datas="chart" />
              {{chart}}
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="emitEvent()"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</template>

<script>
    import LineChart from '~/components/LineChart.vue';
    export default {
        components:{
          LineChart
        },
        props:{
          active:{
            type: Boolean,
          },
          chart:{
            type: Array
          }
        },
        data() {
          return {
            dialog: false
          }
        },
        watch: {
          active (val) {
            val || this.emitEvent()
          },
        },
        methods: {
          emitEvent: function () {
            this.$emit('emitEvent',this.dialog);
          },
        },
        computed : {
          check_val : function (){
            return this.active == true ? true : false
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>