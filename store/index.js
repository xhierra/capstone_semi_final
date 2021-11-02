export const strict = false;

import Moralis from 'moralis';
import _ from 'lodash';
export const state = () => ({
    user:[],
    mainETH: '',
    userETH: undefined,
    profilepic: undefined,
    background: undefined,
    cart: [
       
    ],
    ETHBalance: undefined,
})

export const getters ={

    check_axie_exist_in_cart: (state) => (id) => {
        return _.find(state.cart, function(o) { return o.id == id; })
    },
}


export const mutations = {
   

    authorize_loggin(state,user){
        return state.user = user;
    },

    lock_eth(state,userETH){
        return state.userETH = userETH;
    },

    set_ethbalance(state,ETHBalance){
        return state.ETHBalance = ETHBalance;
    },

    set_balance(state,pointbalance){
        return state.pointbalance = pointbalance;
    },

    set_cart(state,cart){
        return state.cart = cart;
    },

    set_profile(state,profilepic){
        return state.profilepic = profilepic;
    },

    set_background(state,background){
        return state.background = background;
    },
}

export const actions = {
    loggedin({commit}){

        const currentUser =  Moralis.User.current();
        if (currentUser) {
           commit('authorize_loggin', currentUser)
           commit('lock_eth', currentUser.attributes.authData.moralisEth.id)
           let cart = currentUser.attributes.cart == undefined ? [] : currentUser.attributes.cart;
           commit('set_cart', cart)
        }
    },


    async nuxtServerInit  ({ commit }, { req }) {
        
    }

}
