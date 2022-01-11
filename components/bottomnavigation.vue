<template>
    <div>
        <v-bottom-navigation
        app
        >
            <v-btn
            text
            color="primary"
            v-for="(item,key) in routes"
            :key="key"
            :to="item.link"
            >
                <v-icon large>
                    {{item.icon}}
                </v-icon>
                
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            balance: undefined,
            routes: [
            {
                id: 1,
                title: 'Market',
                icon: 'mdi-storefront-outline',
                link: '/market'
            },
            {
                id: 2,
                title: 'Auction',
                icon: 'mdi-ethereum',
                link: '/auction'
            },
             {
                id: 3,
                title: 'Home',
                icon: 'mdi-home-variant-outline',
                link: '/'
            },
            {
                id:4,
                title: 'Crypto',
                icon: 'mdi-chart-bell-curve',
                link: '/crypto'
            },
            {
                id: 5,
                title: 'Cart',
                icon: 'mdi-cart-minus',
                link: '/cart'
            }
            
            ],
            drawer:true,
            items: [
                {
                icon: 'mdi-account',
                title: 'Account',
                to: '/account'
                },
                {
                icon: 'mdi-logout',
                title: 'Logout',
                to: '/logout'
                }
            ],
            miniVariant: true,
            right: false,
            rightDrawer: false,
            title: 'Crypto Bid'
            }
        }
    }
</script>
