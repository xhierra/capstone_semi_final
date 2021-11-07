<template>
    <div>
    <v-card
    class="container"
    outlined
    color="transparent"
    >
        <v-card-title>
            Create new item
        </v-card-title>

        <v-card-text class="pa-2">

            
            <PreviewImage v-on:emitEvent="setPreviewImg($event)"/>
            <Collection v-on:emitEvent="setImgCollecion($event)"/>
            <ItemName v-on:emitEvent="setItemName($event)"/>
            <ItemDescrip v-on:emitEvent="setItemDesc($event)"/>

            <v-list dense>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon> mdi-palette </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        
                        <v-list-item-title>
                            Color Variant
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Shows available colors in a item
                        </v-list-item-subtitle>
                        
                    </v-list-item-content>
                    <v-list-item-icon>
                        <ItemColor/>
                    </v-list-item-icon>

                    
                </v-list-item>

                <v-list-item class="mt-5">
                    <v-list-item-icon>
                        <v-icon> mdi-cog </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        
                        <v-list-item-title>
                            Properties
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Creates custom properties
                        </v-list-item-subtitle>
                        
                    </v-list-item-content>
                    <v-list-item-icon>
                        <ItemColor/>
                    </v-list-item-icon>

                    
                </v-list-item>

            </v-list>
            

            
            <ItemQuantity v-on:emitEvent="setItemQuantity($event)"/>


        </v-card-text>

        <v-card-actions>
            <v-btn
            color="primary"
            large
            class="modifiedbtnTxt"
            :disabled="!createIsValid || attempt"
            :loading="attempt"
            @click="createItem()"
            >
                Create
            </v-btn>
        </v-card-actions>

    </v-card>

    </div>
</template>

<script>

    import PreviewImage from '~/components/createItem/ItemPreviewImage.vue'
    import Collection from '~/components/createItem/ImageCollections.vue'
    import ItemName from '~/components/createItem/ItemName.vue'
    import ItemDescrip from '~/components/createItem/ItemDesc.vue'
    import ItemColor from '~/components/createItem/ItemColorProperty.vue'
    import ItemQuantity from '~/components/createItem/ItemQuantity.vue'
    import Moralis from 'moralis'
    export default {

        components:{
            PreviewImage,
            Collection,
            ItemName,
            ItemDescrip,
            ItemColor,
            ItemQuantity
        },
        
        data() {
            return {
                attempt: false,
                previewImg: null,
                imgCollection: [],
                itemName : '',
                itemDescription : '',
                itemQuant: 1,
            }
        },
    

        methods: {

            setPreviewImg : function (img) {
                return this.previewImg = img
            },

            setImgCollecion : function (collection) {
                return this.imgCollection = collection
            },

            setItemName : function (name) {
                return this.itemName = name
            },

            setItemDesc : function (desc) {
                return this.itemDescription = desc
            },
            
            setItemQuantity : function (quantity) {
                return this.itemQuant = quantity
            },


            async init () {

                const Item = Moralis.Object.extend("Item");
                const query = new Moralis.Query(Item);
                query.equalTo("objectId", this.$route.params.id);
                query.find().then((Items) => {  
                    console.log(Items)
                }, (error) => {
                    console.log(error)
                })
            },

            async createItem (){
                this.attempt = true;
                const previewimage = new Moralis.File(this.previewImg.name, this.previewImg);
                const Item = Moralis.Object.extend("Item");
                const createItem = new Item();

                createItem.set("seller", Moralis.User.current());
                createItem.set("name", this.itemName);
                createItem.set("previewimg", previewimage);
                createItem.set("description", this.itemDescription);
                createItem.set("quantity", Number(this.itemQuant));



                await createItem.save()
                .then((Item) => {

                    this.$store.dispatch('snackbar/setSnackbar', {
                        text : 'New item added to your collection #' + Item.id,
                        color : 'success'
                    });

                }, (error) => {

                    this.$store.dispatch('snackbar/setSnackbar', {
                        text : error.message,
                        color : 'error'
                    });

                });

                if (this.imgCollection.length != 0) {
                    
                        this.$store.dispatch('snackbar/setSnackbar', {
                            text : "Uploading Collection",
                            color : 'warning'
                        });

                        for (const file of this.imgCollection) {
                            const upload = new Moralis.File(file.name, file);
                            const ItemCollection = new Moralis.Object("ItemCollection");
                            ItemCollection.set("ItemID", createItem);
                            ItemCollection.set("ItemFile", upload);

                            await ItemCollection.save()
                            .then((stat) => {
                                this.$store.dispatch('snackbar/setSnackbar', {
                                    text : 'File Uploaded with an id of ' + stat.id ,
                                    color : 'primary'
                                });
                            }, (error) => {
                                this.$store.dispatch('snackbar/setSnackbar', {
                                    text :  error.message,
                                    color : 'error'
                                });
                            })

                        }
                }

                this.attempt = false;

            }
        },
        computed:{
            createIsValid : function (){
                let isValid = false;

                if(
                    this.previewImg != null && 
                    this.itemName != '' &&
                    this.itemQuant > 0
                ){
                    isValid = true
                }

                return isValid;
            }
        },

        mounted() {
            this.init();
        },
    }
</script>

<style lang="scss" scoped>
.modifiedbtnTxt{
    text-transform: none;
}
</style>