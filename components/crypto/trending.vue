<template>
  <div>
    <v-skeleton-loader
      class="mx-auto"
      type="card-heading, list-item-avatar"
      v-if="crypto.length == 0"

    ></v-skeleton-loader>
    <v-card
      style="
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        border-radius: 12px;
        border: 1px solid rgba(209, 213, 219, 0.3);
      "
      outlined
      class="mx-auto"
      v-if="crypto.length != 0"
    >
      <v-card-title>
          Trending Coins
          <v-icon
          class="ml-2"
          small
          @click="btc_value_usd()"
          >
          mdi-reload
          </v-icon>
      </v-card-title>
      <v-card-text>
          <v-slide-group
          v-model="model"
          center-active
          show-arrows
          :loading="crypto.length == 0"
          >
          <v-slide-item
              v-for="(coin,key) in crypto.coins"
              :key="key"
              v-slot="{ toggle }"
          >
              


              <v-btn
              depressed
              rounded    
              color="transparent"
              @click="toggle"
              style="text-transform:none"
              >
                  <v-img
                  :src="coin.item.thumb"
                  :lazy-src="coin.item.thumb"
                  class="mr-2"
                  >
                  </v-img>
                  <h5>
                  {{ coin.item.name }} <br>
                  ({{ coin.item.symbol }})
                  {{ currency_strings(coin.item.price_btc) }}
                  </h5>
              </v-btn>
          </v-slide-item>
          </v-slide-group>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
  export default {
    data: () => ({
      model: null,
      bitcoin: undefined,
      crypto: [],
      load: false,
    }),

    methods:{
        async trending_coin (){
            
            this.crypto = []
            const send = await this.$axios.get('https://api.coingecko.com/api/v3/search/trending')
            
            if(send.status == 200){
                const respond = await send.data
                this.crypto = respond;
            }

        },

        async btc_value_usd (){
            const send = await this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
            
            if(send.status == 200){
                const respond = await send.data
                this.bitcoin = respond.bitcoin.usd;
                this.trending_coin()
            }
        },

        currency_strings : function (val){
            if(this.bitcoin != undefined){
                const convert = val * this.bitcoin
                return  "$ " + convert.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        },
    },
    filters:{
        toUpper(str) {
          return str.toUpperCase()
        }
    },
    mounted(){
        this.btc_value_usd()
    }
  }
</script>