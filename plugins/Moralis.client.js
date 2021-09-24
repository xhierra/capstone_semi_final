import {Moralis} from 'moralis';
import Vue from 'vue'

Moralis.initialize("PhBXrjTWlgxttd23VTB3V0FCWSh9JRk58tEF3R2s");
Moralis.serverURL = "https://irvbwxahtgis.bigmoralis.com:2053/server"
Moralis.Web3.getSigningData = () => 'Welcome to CrypInto'


Vue.use(Moralis);