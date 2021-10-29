<template>
    <div class="container" v-if="info.length != 0">
        <v-card
        class="modified"
        outlined
        >
            <v-card-text>
                <LineChart :datas="chart" v-if="chart_load" />
            </v-card-text>
        </v-card>
        <v-row>
            <v-col>
                
                <v-card
                class="mt-2 modified"
                outlined
                >
                    <v-card-title>
                        <v-avatar
                        size="30"
                        >
                        <v-img
                        :src="info.image.thumb">

                        </v-img>
                        </v-avatar>
                        {{info.name}}
                        ({{info.symbol | upper}})
                    </v-card-title>

                    <v-card-subtitle>
                        {{info.tickers[0].last | currency}}
                        <sup class="ml-1">{{info.market_data.price_change_percentage_24h | two_decimal}}</sup>
                    </v-card-subtitle>

                    <v-card-text v-html="info.description.en">
                        
                    </v-card-text>


                </v-card>
            </v-col>
            <v-col>
                <v-card
                class="mt-2 modified"
                outlined>
                    <v-card-title>
                        Info
                    </v-card-title>
                    <v-card-text>

                        <span class="mr-5">Website</span>
                        <v-btn
                            class="mx-1"
                            text
                            style="text-transform:none;"
                            v-for="(links,key) in info.links.homepage"
                            :key="key"
                            :href="links"
                            target="_blank"
                        >
                            {{links}}
                        </v-btn>

                        <br>
                        
                        <span class="mr-5">Explorer</span>
                        <v-btn
                            class="mx-1"
                            text
                            style="text-transform:none;"
                            v-for="(links,key) in info.links.blockchain_site"
                            :key="key"
                            :href="links"
                            target="_blank"
                        >
                            {{links}}
                        </v-btn>

                        <br>
                        
                        <span class="mr-5">Repository</span>
                        <v-btn
                            class="mx-1"
                            text
                            style="text-transform:none;"
                            v-for="(links,key) in info.links.repos_url.github"
                            :key="key"
                            :href="links"
                            target="_blank"
                        >
                            {{links}}
                        </v-btn>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LineChart from '~/components/LineChart.vue';
    export default {
        data() {
            return {
                info:[],
                chart: [],
                chart_load:false,
            }
        },
        components:{
            LineChart
        },

        methods: {
            async create_chart (){
                this.chart = []
                const send = await this.$axios.get('https://api.coingecko.com/api/v3/coins/' + `${this.$route.params.id}` +'/market_chart?vs_currency=usd&days=1')
                if(send.status == 200){
                const respond = await send.data
                respond.prices.forEach(element => {
                    this.chart.push(element[1])
                });
                }
                this.chart_load = true
            },

            async create_info () {
                const send = await this.$axios.get('https://api.coingecko.com/api/v3/coins/' + `${this.$route.params.id}`)
                if(send.status == 200){
                const respond = await send.data
                this.info = respond
                }
            }
        },
        filters:{
            upper : function (str) {
                return str.toUpperCase()
            },
            currency : function (val){
                return  "$" + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            two_decimal : function (val){
                return  val.toFixed(2)
            },
        },
        mounted(){
            this.create_chart()
            this.create_info()
        }
    }
</script>

<style lang="scss" scoped>
.modified{
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>