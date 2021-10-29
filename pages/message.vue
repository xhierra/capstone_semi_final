<template>
    <div class="container">
        <Contact v-on:emitEvent="activeMessage($event)"/>
        <Message :chatRoomID="chatID"/>
    </div>
</template>

<script>
    import Message from '~/components/communicate/message.vue'
    import Contact from '~/components/communicate/contact.vue'
    export default {
        components:{
            Message,
            Contact
        },

        data() {
            return {
                chatID: null
            }
        },

        methods: {
            activeMessage : function (id) {
                return this.chatID = id
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>