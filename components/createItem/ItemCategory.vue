<template>
    <v-card
    color="transparent"
    outlined
    width="400"
    >
    <v-card-title>
        Item category
    </v-card-title>
    <v-card-subtitle>
        The total supply of item to be able to purchase 
    </v-card-subtitle>
    <v-card-text>

        <v-select
            v-model="category"
            :items="categorylist"
            color="primary"
            rounded
            filled
            class="mt-3"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search for categories"
        />

    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {

        category: '',
        
        rules: {
          required: value => !!value || 'This field is required'
        },

        categorylist: [
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

        ]

      }
    },
    methods: {
       emitEvent : function (){
            this.$emit('emitEvent',this.category);
        } 
    },
    watch:{
        category : function (){
            this.emitEvent();
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>