<template>
    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            icon
            x-small
          >
            <v-icon>mdi-pencil-box-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card
          shaped>
            <v-toolbar
              color="dark"
              dark
            >Create Room</v-toolbar>
            <v-card-text class="mt-10">
              <v-text-field
              v-model="room_name"
              large
              rounded
              filled
              label="Create Message Room"
              append-outer-icon="mdi-check"
              @keyup.enter="createNewRoom()"
              @click:append-outer="createNewRoom()"
              />
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
    </v-dialog>
</template>

<script>
  import Moralis from 'moralis'
    export default {
        data() {
          return {
            room_name: '',
            available_room_public: []
          }
        },
        methods: {


          async createNewRoom () {

            if(this.room_name.trim() != ''){
              
              const RoomName = Moralis.Object.extend("Chats");
              const chat = new RoomName();

              await chat.save({
                title: this.room_name,
                creator: Moralis.User.current(),
              })
              .then((gameScore) => {
                console.log(gameScore)
              }, (error) => {
                console.error(error)
              });

              const Joined = Moralis.Object.extend("ChatsJoined");
              const chatRoom = new Joined();

              await chatRoom.save({
                chatID: chat,
                youraccount: Moralis.User.current(),
              })
              .then((gameScore) => {
                console.log(gameScore)
              }, (error) => {
                console.error(error)
              });


            }


          },

          

        },
    }
</script>

<style lang="scss" scoped>

</style>