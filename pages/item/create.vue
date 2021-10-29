<template>
    
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
        </v-card-text>

        <v-card-actions>
            <v-btn
            color="primary"
            large
            class="modifiedbtnTxt"
            :disabled="!createIsValid"
            >
                Create
            </v-btn>
        </v-card-actions>

    </v-card>
        
</template>

<script>

    import PreviewImage from '~/components/createItem/PreviewImage.vue'
    export default {

        components:{
            PreviewImage
        },
        
        data() {
            return {
                previewImg: null      
            }
        },

        methods: {
            setPreviewImg : function (img) {
                return this.previewImg = img
            }
        },
        computed:{
            createIsValid : function (){
                let isValid = false;

                if(
                    this.previewImg != null
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