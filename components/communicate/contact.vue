<template>
    <div>
    <v-layout v-resize="onResize">
        <v-navigation-drawer
            app
            :width="325"
            clipped
        >
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="text-h5 mt-10 text-center">
                    Contacts
                    <Compose/>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <v-text-field
                    filled
                    rounded
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                    >

                    </v-text-field>
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
                <v-container>
                            <v-list 
                            rounded
                            subheader>
                                <v-list-item-group v-model="activeChat">
                                
                                <template v-for="(item, index) in rooms">
                                    
                                    <v-list-item
                                        :key="index"
                                        :value="item.attributes.chatID"
                                        class="mt-2"
                                    >
                                        <v-list-item-avatar color="grey lighten-1 white--text" class="d-flex justify-center">
                                        <v-avatar
                                            v-text="item.attributes.chatID.attributes.title.slice(0, 1).toUpperCase()"
                                        ></v-avatar>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                        <v-list-item-title v-text="item.attributes.chatID.attributes.title" />
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    
                                <v-divider
                                    :key="`chatDivider${index}`"
                                    class="my-0"
                                />
                                </template>
                            </v-list-item-group>
                            </v-list>
                </v-container>
        </v-navigation-drawer>

        <v-card
            class="mb-2 card"
            width="800"
            outlined
            v-if="windowSize.x <= 1024"
        >
            <v-card-title>
            Contacts
            <v-spacer></v-spacer>
            <Compose/>
            </v-card-title>

            <v-card-subtitle>
                <v-text-field
                filled
                rounded
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                >
                </v-text-field>
            </v-card-subtitle>
            
            <v-card-text>
                <v-slide-group
                v-model="activeChat"
                show-arrows
                center-active
                >
                <v-slide-item
                    v-for="(item, index) in rooms"
                    :key="index"
                    :value="item.attributes.chatID"
                    v-slot="{ active, toggle }"
                >
                    <v-btn
                    class="mx-2"
                    :input-value="active"
                    active-class="primary white--text"
                    depressed
                    rounded
                    @click="toggle"
                    large
                    >
                    <v-avatar
                        size="30"
                        color="grey lighten-1 white--text"
                        class="d-flex justify-center mr-2"
                        v-text="item.attributes.chatID.attributes.title.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{item.attributes.chatID.attributes.title}}
                    </v-btn>
                </v-slide-item>
                </v-slide-group>
            </v-card-text>
        </v-card>
    </v-layout>
    </div>
</template>

<script>
    import Moralis from 'moralis' 
    import Compose from '~/components/communicate/compose.vue'
    export default {
        components:{
            Compose
        },
        

        data() {
            return {
                activeChat: null,
                rooms: [],
                windowSize: {
                    x: 0,
                    y: 0,
                },
            }
        },

        watch: {
          activeChat () {
            this.emitEvent()
          },
        },


        methods: {

            onResize () {
                this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            },

            emitEvent: function () {
                this.$emit('emitEvent',this.activeChat);

                console.log(this.activeChat)
            },
            async getAvailableRooms (){
                
                const response = await Moralis.Cloud.run("getAvailableRooms");
                this.rooms = response;
                
            },

            async roomSocket() {
                let query = new Moralis.Query('ChatsJoined');
                // query.include("Chats")
                let subscription = await query.subscribe();


                subscription.on('create', (object) => {
                    if(object.get("youraccount").id == Moralis.User.current().id){
                        this.rooms.unshift(object)
                    }
                })
            }
        },

 
        mounted() {
            this.onResize()
            this.getAvailableRooms()
            this.roomSocket()
        },

    }
</script>

<style lang="scss" scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>