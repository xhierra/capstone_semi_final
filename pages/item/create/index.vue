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
            <Category v-on:emitEvent="setCategory($event)"/>
            <ItemName v-on:emitEvent="setItemName($event)"/>
            <ItemDescrip v-on:emitEvent="setItemDesc($event)"/>
            
            
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
    import Category from '~/components/createItem/ItemCategory.vue'
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
            ItemQuantity,
            Category
        },
        
        data() {
            return {
                attempt: false,
                previewImg: null,
                imgCollection: [],
                itemName : '',
                itemDescription : '',
                itemQuant: 1,
                category: ''
            }
        },
    

        methods: {
            setPreviewImg : function (img) {
                return this.previewImg = img
            },

            setCategory : function (cate) {
                return this.category = cate
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

            async createItem (){
                this.attempt = true;
                const previewimage = new Moralis.File(this.previewImg.name, this.previewImg);
                const Item = Moralis.Object.extend("Item");
                const createItem = new Item();

                createItem.set("seller", Moralis.User.current());
                createItem.set("name", this.itemName);
                createItem.set("category", this.category);
                createItem.set("previewimg", previewimage);
                createItem.set("description", this.itemDescription);
                createItem.set("availability", this.itemQuant);



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
                            icon: "mdi-cloud-sync-outline",
                            text : "Attempting to upload images in this collection",
                            color : 'purple'
                        });

                        for (const file of this.imgCollection) {
                            const upload = new Moralis.File(file.name, file);
                            const ItemCollection = new Moralis.Object("ItemCollection");
                            ItemCollection.set("ItemID", createItem);
                            ItemCollection.set("ItemFile", upload);

                            await ItemCollection.save()
                            .then((stat) => {
                                this.$store.dispatch('snackbar/setSnackbar', {
                                    icon: 'mdi-cloud-check-outline',
                                    text : 'File upload success # ' + stat.id ,
                                    color : 'primary'
                                });
                            }, (error) => {
                                this.$store.dispatch('snackbar/setSnackbar', {
                                    icon: 'mdi-file-remove',
                                    text :  error.message,
                                    color : 'error'
                                });
                            })
                        }

                        this.$store.dispatch('snackbar/setSnackbar', {
                            icon: "mdi-cloud-check-outline",
                            text : "Images saved to the cloud!",
                            color : 'dark'
                        });
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
                    this.itemQuant != ''
                ){
                    isValid = true
                }

                return isValid;
            }
        }
    }
</script>

<style lang="scss" scoped>
.modifiedbtnTxt{
    text-transform: none;
}
</style>