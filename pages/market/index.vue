<template>
    <div>

        <!-- Filters -->
        <v-navigation-drawer
        app
        clipped
        width="350"
        >
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="d-flex flex-row">
                    <span class="text-h6">Item Filters</span>
                    <v-spacer></v-spacer>
                    <small class="mt-2">Clear Filter</small>
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
            <v-expansion-panels
            flat
            class="px-3"
            >

                <!-- Currency -->
                <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6">
                        Category
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>

                        <v-combobox
                        :items="categorySub"
                        color="primary"
                        rounded
                        filled
                        class="mt-3"
                        prepend-inner-icon="mdi-magnify"
                        placeholder="Search for categories"
                        >
                            <template slot='item' slot-scope='{ item }'>
                                <v-list-item @click="appendSelectedCategorySub(item)">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>

                        </v-combobox>


                        <v-list rounded v-if="categorySelected.length != 0">
                            <v-list-item-group>
                                <v-list-item
                                v-for="(item, i) in categorySelected"
                                :key="i"
                                @click="preppendSelectedCategory(item)"
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                        <v-card
                        color="transparent"
                        class="mt-2"
                        outlined>
                            <v-card-subtitle class="overline">
                                Suggestion
                            </v-card-subtitle>
                            <v-list rounded>
                            <v-list-item-group>
                                <v-list-item
                                v-for="(item, i) in category"
                                :key="i"
                                @click="appendSelectedCategory(item)"
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            </v-list>
                        
                        </v-card>


                    </v-expansion-panel-content>
                    
                </v-expansion-panel>
                <!-- Currency -->

                <!-- Currency -->
                <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6">
                        Currency
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>

                        <v-combobox
                        :items="tokens"
                        item-text="name"
                        item-value="name"
                        color="primary"
                        rounded
                        filled
                        class="mt-3"
                        prepend-inner-icon="mdi-magnify"
                        placeholder="Search for categories"
                        :loading="tokens.length == 0"
                        
                        >
                            <template slot='item' slot-scope='{ item }'>
                                <v-list-item @click="appendSelectedToken(item.name)">
                                    <v-list-item-icon>
                                        <v-avatar
                                            size="30"
                                        >
                                            <img
                                                :lazy-src="item.logoURI"
                                                :src="item.logoURI"
                                            >
                                        </v-avatar>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.symbol"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-combobox>


                        <v-list rounded v-if="tokenSelected.length != 0">
                            <v-list-item-group>
                                <v-list-item
                                v-for="(item, i) in tokenSelected"
                                :key="i"
                                @click="preppendSelectedToken(item.name)"
                                >
                                <v-list-item-icon>
                                    <v-avatar
                                            size="30"
                                        >
                                        <img
                                            :lazy-src="item.logoURI"
                                            :src="item.logoURI"
                                        >
                                    </v-avatar>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.symbol"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                    </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Currency -->

                <!-- Price -->
                <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6">
                        Price
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <h6 class="mb-2">Philippine Pesos</h6>

                        <div class="d-flex flex-row mb-2">

                            <v-text-field
                            v-model="min"
                            filled
                            rounded
                            placeholder="min"
                            hide-details
                            type="number"
                            ></v-text-field>

                            <span class="mx-2 mt-4">to</span>

                            <v-text-field
                            v-model="max"
                            filled
                            rounded
                            placeholder="max"
                            hide-details
                            type="number"
                            ></v-text-field>

                        </div>

                        <v-btn
                            depressed
                            block
                            color="primary"
                            :disabled="min == null && max == null"
                            @click="initItems()"
                        >
                            Apply
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Price -->



            </v-expansion-panels>

            <v-divider></v-divider>
        </v-navigation-drawer>
        <!-- Filters -->
        <v-container>

            <div class="d-flex flex-row my-3">

                <span v-if="items.length != 0" class="py-3">
                    {{items.count}} results
                </span>

                <v-spacer></v-spacer>
            

                <!-- <v-select
                outlined
                label="All Item"
                hide-details
                
                ></v-select> -->

                <v-text-field
                v-model="search"
                class="filterwidth mr-2"
                outlined
                label="Search Item"
                prepend-inner-icon="mdi-magnify"
                hide-details
                >
                    
                </v-text-field>

                <v-select
                v-model="sort"
                :items="sortlist"
                outlined
                label="Sort"
                hide-details
                class="filterwidth"
                ></v-select>
            </div>


            <!-- Items -->
            <div v-if="isloading">
                <div v-if="items.count != 0">
                    <v-row>
                        <v-col 
                        v-for="(item,key) in items.results"
                        :key="key"
                        col="5"
                        lg="4"
                        md="3"
                        sm="3"
                        >
                            <Preview
                            :Item="item"
                            :price="item.get('pesoprice')"
                            :seller="item.get('seller').get('username')"
                            :verified="item.get('seller').get('verified')"
                            :name="item.get('name')"
                            :img="item.get('previewimg')._url"
                            :coinname="item.get('tokenname')"
                            
                            :coin="item.get('token').logoURI"
                            :tokenprice="calculatePrice(item.get('token').name,item.get('pesoprice'))"/>
                        </v-col>
                    </v-row>
                </div>

                <div v-else class="d-flex justify-center" style="margin-top:220px;">
                    <h1>No Result</h1>
                </div>
            </div>
            
            <div v-else class="d-flex justify-center" style="margin-top:220px;">
                    <v-progress-circular
                    :size="60"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
            </div>
            <!-- Items -->


            <!-- Pagination -->
            <div class="text-center mt-5">
                <v-pagination
                v-if="items.length != 0"
                v-model="page"
                :length="paginate"
                circle
                :total-visible="7"
                ></v-pagination>
            </div>
            <!-- Pagination -->

        </v-container>



    </div>
</template>

<script>
    import Preview from '~/components/showcaseitem/itemascard.vue'
    import Moralis from 'moralis'
    import _ from 'lodash'
    export default {
        components:{
            Preview
        },

        data() {
            return {

                search: '',
                min: null,
                max: null,


                category:[

                    "Electronics Devices",
                    "Electronics Accessories",
                    "TV & Home Appliances",
                    "Health & Beauty",
                    "Babies & Toys",
                    "Groceries & Pets",
                    "Home & Living",
                    "Women's Fashion",
                    "men's Fashion",
                    "Fashion Accessories",
                    "Sports & Lifestyle",
                    "Automotive & motorcycles"

                ],
                sort: '',

                sortlist:[
                    'Ascending',
                    'Descending'
                ],


                categorySub: [
                    "Mobiles",
                    "Tablets",
                    "Laptops",
                    "Desktops",
                    "Security Cameras",
                    "Action/Video Cameras",
                    "Digital Cameras",
                    "Gaming Consoles",
                    "Gadgets",
                    "Mobile Accessories",
                    "Audio",
                    "Computer Accessories",
                    "Camera Accessories",
                    "Storage",
                    "Printers",
                    "Computer Components",
                    "Network Components",
                    "Wearable Technology",
                    "Console Accessories",
                    "Tablet Accessories",
                    "TV & Video Devices",
                    "TV Accessories",
                    "Home Audio",
                    "Cooling & Air Treatment",
                    "Small Kitchen Appliances",
                    "Vacuums & Floor Care",
                    "Household Appliances",
                    "Personal Care Appliances",
                    "Large Appliances",
                    "Parts & Accessories",
                    "Make-Up",
                    "Skincare",
                    "Bath & Body",
                    "Personal Care",
                    "Men's Care",
                    "Fragrances",
                    "Beauty Tools",
                    "Food Supplements",
                    "Medical Supplies",
                    "Sexual Wellness",
                    "Adults Diapers & Incontinence",
                    "Diapering & Potty",
                    "Milk Formula & Baby Food",
                    "Baby Fashion & Accessories",
                    "Feeding Essential",
                    "Baby Gear",
                    "Nursery",
                    "Baby Personal Care",
                    "Toy & Games",
                    "Electronics & Remote Control",
                    "Sports Toys & Outdoor Play",
                    "Baby & Toddler Toys",
                    "Learning & Education",
                    "Drinks",
                    "Beer, Wine Spirits",
                    "Food Staples & Cooking Essentials",
                    "Breakfast Cereals & Spreads",
                    "Chocolates, Snacks & Sweets",
                    "Bakery",
                    "Fruit & Vegetables",
                    "Frozen",
                    "Household Supplies",
                    "Pet Accessories",
                    "Pet Food",
                    "Pet Health Care",
                    "Bath",
                    "Bedding",
                    "Furniture",
                    "Storage & Organization",
                    "Laundry & Cleaning Equipment",
                    "Kitchen & Dining",
                    "Lighting",
                    "Home Decor",
                    "Outdoor & Garden",
                    "Stationery & Craft",
                    "Tools & Home Improvement",
                    "Women's Clothing",
                    "Women's Shoes",
                    "Lingerie, Sleep & Lounge",
                    "Accessories",
                    "Girl's Clothing",
                    "Girl's Shoes",
                    "Women's Bags",
                    "Kids Bags",
                    "Laptop Bags",
                    "Travel",
                    "Women's Short Clothing",
                    "Women's Sports Shoes",
                    "Men's Clothing",
                    "Men's Shoes",
                    "lingerie, Sleep & Lounge",
                    "Accessories",
                    "Boy's Clothing",
                    "Boy's Shoes",
                    "Men's Bags",
                    "Laptop Bags",
                    "Travel",
                    "Men's Sports Clothing",
                    "Men's Sports Shoes",
                    "Women Watches",
                    "Women's Fashion Jewelry",
                    "Women's Fine Jewelry",
                    "Men Watches",
                    "Men's Jewelry",
                    "Kid's Watches",
                    "Kid's Jewelry",
                    "Eyeglass",
                    "Sunglasses",
                    "Contact Lenses",
                    "Outdoor Recreation",
                    "Sports Shoes",
                    "Sports Apparel",
                    "Exercise & Fitness Equipment",
                    "Sports Equipment",
                    "Team Merchandise/Fan Shop",
                    "Musical Instruments",
                    "Books",
                    "Movies",
                    "Magazine",
                    "Automotive",
                    "Motorcycle",
                    "Vehicle Care",
                    "Automobile sales & Reservation",
                    "Motorcycle Sales & Reservation",
                    "Fuels- Gasoline/Petrol, Diesel",
                    "Automotive Oils & Fluids",
                    "Motorcycle Oils & Fluids"

                ],

                categorySelected:[],
                categorySelectedTemp:[],
                

                tokens: [],
                tokenSelected:[],
                tokenSelectedTemp:[],


                page: 1,
                pagetoShow: 10,
                paginatePage: undefined,
                isloading: false,

                items:[],

                itemsToken: [],
                itemTokenPrice:[]
            }
        },



        watch:{

            sort : function (v){
                if(v == "Ascending"){
                    if(this.items.length != 0){
                        this.items.results.reverse();
                    }
                }else{
                    if(this.items.length != 0){
                        this.items.results.sort();
                    }
                }
            },

            search : function (){
                this.initItems()
            },

            categorySelected : function (v){
                console.log(v);
                this.initItems()
            },

            tokenSelectedTemp : function (v){
                console.log(v);
                this.initItems()
            },

            page : function (){
                this.initItems()
            }
        },


        computed:{
            paginate : function (){


                const calculatePage = this.items.count / this.pagetoShow;
                console.log(calculatePage)
                return Math.ceil(calculatePage);
            },
        },


        methods:{

            
            initItems: _.debounce(async function(){

                

                 
                const params =  {
                    search: this.search == '' ? undefined : this.search,
                    page: this.page ,
                    pageSize: this.pagetoShow,
                    category: this.categorySelected.length == 0 ? undefined : this.categorySelected,
                    token: this.tokenSelectedTemp.length == 0 ? undefined : this.tokenSelectedTemp,

                    min: this.min == null ? undefined : this.min,
                    max: this.max == null ? undefined : this.max,
                };

                const Items = await Moralis.Cloud.run("getItem",params);

                this.items = Items

                this.loadprice()

            },1000),

            loadprice: _.debounce(async function (){

                 
                for(const tokens in this.items.results){ 
                   this.itemsToken.push(this.items.results[tokens].get('token').name)
                }
                 
                const RemoveDuplicates = [...new Set(this.itemsToken)]
                
                const send = await this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+`${RemoveDuplicates.toString()}`+'&vs_currencies=php');

                const respo = await send.data;

                this.itemTokenPrice = respo 

            },1000),


            calculatePrice : function (token,price){


                for(const tokens in this.itemTokenPrice){
                    if(token.toLowerCase() == tokens){
                        
                        const calculate = price / this.itemTokenPrice[tokens].php

                        const tokenprice = calculate.toFixed(4)

                        return tokenprice
                    }
                }

            },





            appendSelectedCategory : function (name){
                const key = _.findIndex(this.category, function(o) { return o == name; })
                this.categorySelected.push(name)
                this.$delete(this.category, key)
            },

            preppendSelectedCategory : function (name){
                const key = _.findIndex(this.categorySelected, function(o) { return o == name; })
                this.category.push(name)
                this.$delete(this.categorySelected, key)
            },


            appendSelectedCategorySub : function (name){
                const key = _.findIndex(this.categorySub, function(o) { return o == name; })
                this.categorySelected.push(name)
                this.$delete(this.category, key)
            },

            preppendSelectedCategorySub : function (name){
                const key = _.findIndex(this.categorySelected, function(o) { return o == name; })
                this.categorySub.push(name)
                this.$delete(this.categorySelected, key)
            },

            appendSelectedToken : function (name){
                const key = _.findIndex(this.tokens, function(o) { return o.name == name; })
                this.tokenSelected.push(this.tokens[key])
                this.tokenSelectedTemp.push(name)
                this.$delete(this.tokens, key)
            },

             preppendSelectedToken : function (name){
                const key = _.findIndex(this.tokenSelected, function(o) { return o.name == name; })
                const keyTemp = _.findIndex(this.tokenSelectedTemp, function(o) { return o == name; })
                this.tokens.push(this.tokenSelected[key])
                this.$delete(this.tokenSelected, key)
                this.$delete(this.tokenSelectedTemp, keyTemp)
            },

            async getSupportedTokens() {

                const result = await Moralis.Plugins.oneInch.getSupportedTokens({
                    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                });

                this.tokens = Object.values(result.tokens);
                console.log(result.tokens)
            }


        },

        mounted(){
            this.initItems()
            this.isloading = true;
            this.getSupportedTokens()
            
        }
    }
</script>

<style>
    .filterwidth{
        max-width: 200px;
    }
</style>