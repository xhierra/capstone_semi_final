<template>
  <v-app>

    <v-layout v-resize="onResize">
    
    <NavigationBar :width_demension="windowSize.x"/>
    <BottomNavigationBar v-if="windowSize.x <= 1024"/>

    <v-main>
        <Nuxt />
    </v-main>

    
    </v-layout>

  <TheSnackbar />
  
  </v-app>
</template>

<script>
import Moralis from 'moralis'
import NavigationBar from '~/components/navigation.vue'
import BottomNavigationBar from '~/components/bottomnavigation.vue'
import { mapActions,mapState,mapMutations } from 'vuex'
import TheSnackbar from '@/components/TheSnackbar.vue';
export default {
  components:{
    NavigationBar,
    BottomNavigationBar,
    TheSnackbar
  },
  data () {
      return {
        windowSize: {
          x: 0,
          y: 0,
        },
      }
  },
  computed:{
    ...mapState(
        [
          'user',
          'userETH'
        ]
      ),
  },


  mounted(){
      this.onResize()
      this.loggedin();
      // this.load_eth_balance();
  },

  methods:{

      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },

      ...mapActions(['currentUser','loggedin']),

      ...mapMutations(['lock_eth','set_ethbalance']),

      async load_eth_balance(){
        if(this.user.length != 0){
          const web3 = await Moralis.Web3.enable();
          const balances =  await Moralis.Web3.getERC20();
          console.log(web3)
          // let currentBalance = web3.utils.fromWei(balances.balance, 'ether')
          // this.set_ethbalance(parseFloat(currentBalance).toFixed(4));
          // console.log(parseFloat(currentBalance).toFixed(4));
        }
      },
  }

  
}
</script>

