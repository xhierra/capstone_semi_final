
<template>
  <div>
  <v-card
  style="
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
  "
  outlined
  class="pa-10"
  >
    <v-card-title>
      <v-icon class="mr-1">
        mdi-chart-bar
      </v-icon>
      Cryptocurrency Prices by Market Cap
      
    </v-card-title>

    <v-card-subtitle>
      {{market_cap_desc}}
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        rounded
        filled
        class="mt-2"
      ></v-text-field>
    </v-card-subtitle>

    <v-data-table
      :loading="coins.length == 0"
      :headers="headers"
      :items="coins"
      :search="search"
      @click:row="show"
      style="cursor:pointer"
    >
    
    <template v-slot:item.image="{ item }">
        <v-img
        :src="item.image"
        :lazy-src="item.image"
        height="30"
        width="30"
        >
        </v-img>
    </template>


    <template v-slot:item.symbol="{ item }">
        <small>{{item.symbol | toUpper}}</small>
    </template>


    <template v-slot:item.current_price="{ item }">
        {{item.current_price | currency_strings}}
    </template>

    <template v-slot:item.total_volume="{ item }">
        {{item.total_volume | currency_strings}}
    </template>

    <template v-slot:item.market_cap="{ item }">
        {{item.market_cap | currency_strings}}
    </template>

    </v-data-table>
  </v-card>


  <!-- <v-dialog
        transition="dialog-top-transition"
        max-width="900"
        v-model="active"
      >
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the top</v-toolbar>
            <v-card-text>
              <LineChart :datas="chart"  :key="componentKey"/>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog> -->
    <Moreinfo :active.sync="active" v-on:emitEvent="close($event)"/>
  </div>
</template>



<script>
  import Moreinfo from '~/components/crypto/view_coin.vue'
  import LineChart from '~/components/LineChart.vue';
  export default {
    components:{
      LineChart,
      Moreinfo
    },
    data () {
      return {
        market_cap_desc : "Market cap is one of the most popular metric in the industry that is used to gauge the value of an asset. The market cap of a cryptocurrency is calculated based on the coin's total circulating supply multipled by the current price. For detailed examples on how that works, check out the methodology page.",
        componentKey: 0,
        search: '',
        active: false,
        chart: [],
        info:[],
        headers: [
          {
            text: 'Rank',
            align: 'start',
            filterable: false,
            value: 'market_cap_rank',
          },
          { text: 'Logo', value: 'image' },
          { text: 'Coin', value: 'name' },
          { text: 'Symbol', value: 'symbol' },
          { text: 'Price', value: 'current_price' },
          { text: '24H Volume', value: 'total_volume' },
          { text: 'Mkt Cap', value: 'market_cap' },
        ],

        coins: []
      }
    },
    
    methods: {
      async list_of_coins () { 
        const send = await this.$axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false");
        if(send.status == 200) { 
          const response = await send.data
          this.coins = response
          console.log(this.coins)
        }
      },

      show (id){
        this.$router.push('/crypto/preview/'+id.id)
        // this.create_chart(id.id)
        // this.componentKey += 1;
        // this.active = true
        // console.log(this.active)
        // console.log(this.componentKey)
      },

      async create_chart (chart){
        this.chart = []
        const send = await this.$axios.get('https://api.coingecko.com/api/v3/coins/' + `${chart}` +'/market_chart?vs_currency=usd&days=1')
    
        if(send.status == 200){
          const respond = await send.data
          respond.prices.forEach(element => {
            this.chart.push(element[1])
          });
        }
      },

      close (fuck) {
        this.active = fuck
      },

    },
    filters:{
        currency_strings : function (val){
            return  "$" + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        toUpper : function (val) { 
          return val.toUpperCase()
        }
    },
    mounted() {
        this.list_of_coins();
    }
  }
</script>


<style lang="scss" scoped>

</style>