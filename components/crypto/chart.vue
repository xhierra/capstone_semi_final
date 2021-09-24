<template>
    <v-card
    shaped
    class="mt-2"
    >
          <v-sparkline
            :value="value"
            :labels="labels"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
        ></v-sparkline>
    </v-card>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  import _ from 'lodash'
  export default {
    data: () => ({
      width: 1,
      radius: 0,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [],
      labels:[],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
    methods: {
      async create_chart (){
            
            const send = await this.$axios.get('https://api.coingecko.com/api/v3/coins/gala/market_chart?vs_currency=usd&days=1')
            
            if(send.status == 200){
                const respond = await send.data
                respond.prices.forEach(element => {
                  this.value.push( Number.isInteger(element[0]) ? element[0] % 1000 : element[0].toString().slice(-1))
                  this.labels.push(element[1])
                });

                console.log(this.value)
                console.log(this.labels)
            }

      },
    },
    mounted(){
      this.create_chart()
    }
  
  }
</script>