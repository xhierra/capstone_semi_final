<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"
        v-model="dialog"
      >
          <v-card
          shaped
          >

            
            <v-card-title>
                Swap
                <v-spacer></v-spacer>

                <v-btn
                text
                @click="emitEvent(false)"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            
            <v-card-text>
            <iframe
                src="https://app.uniswap.org/#/swap?use=v1?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
                height="660px"
                width="100%"
                style="
                    border: 0;
                    margin: 0 auto;
                    display: block;
                    border-radius: 10px;
                "
                id="myId"
            />
            </v-card-text>
          </v-card>
    </v-dialog>
</template>


<script>
export default {
  props:{
    dialog:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      close: false,
    }
  },
  watch: {
    dialog (v) {
        this.emitEvent(v)
    },
  },
  methods: {
    emitEvent: function (v) {
      this.$emit('emitEvent',v);
    }
  },
}
</script>