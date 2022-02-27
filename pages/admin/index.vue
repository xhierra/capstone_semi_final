
<template>
    <div>

       
        <v-data-table
            :headers="headers"
            :items="user"   
            class="elevation-1"
        >
            <template v-slot:item.attributes.is_ban="{ item }">
                <v-simple-checkbox v-model="item.is_ban"
                    disabled>  </v-simple-checkbox>
            </template>
        
        </v-data-table>




    </div>
</template>
        




<script>
import Moralis from 'moralis';

export default {
    data(){
            return {
                user     : [],
                headers   : [
                        {
                            text: 'username',
                            align: 'start',
                            sortable: false,
                            value: 'attributes.username',
                        },
                        { text: 'createdat', value: 'attributes.createdAt' },
                        { text: 'updatedat', value: 'attributes.updatedAt' },
                        { text: 'accounts', value: 'attributes.accounts' },
                        { text: 'eth address', value: 'attributes.ethAddress' },    
                        { text: 'objectid', value: 'id' },
                        { text: 'is_ban', value: 'attributes.is_ban' },
                        ]
            }

        },


    methods:{
         


        async get_user(){
            //this.user = this.$route.params.id
            
            const params = {username:'sample'}
            this.user = await Moralis.Cloud.run("get_all_user" ,params );
            console.log(this.user);
            
            
            
            
            
        }
    },
    mounted(){
            this.get_user()
            
}

}
</script>
<style lang="scss" scoped>

</style>