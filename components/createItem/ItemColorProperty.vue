<template>

    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            large
            icon
            outlined
          >
            <v-icon>
                mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
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
    export default {
        data() {
          return {
            color: []
          }
        },
        methods: {
          async initColors (){

            const where = encodeURIComponent(JSON.stringify({
              "name": {
                "$exists": true
              },
              "hexCode": {
                "$exists": true
              }
            }));

            const sendRequest = await this.$axios('https://parseapi.back4app.com/classes/Color?count=1&limit=10&keys=name,hexCode&where='`${where}`,{
              headers: {
                'X-Parse-Application-Id': 'vei5uu7QWv5PsN3vS33pfc7MPeOPeZkrOcP24yNX', // This is the fake app's application id
                'X-Parse-Master-Key': 'aImLE6lX86EFpea2nDjq9123qJnG0hxke416U7Je', // This is the fake app's readonly master key
              }
            })

            const response = sendRequest.data
            console.log(response)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>