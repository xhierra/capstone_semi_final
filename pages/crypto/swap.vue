<template>
    <v-container class="mt-15 d-flex justify-center">
        <v-card
        width="500"
        >
            <v-card-title>
                Swap Coins
            </v-card-title>

            <v-card-text>
                <v-card outlined>
                    <v-card-title class="caption">
                        From
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-row">
                            <v-text-field
                            placeholder="0.0"
                            type="number"
                            hide-details
                            ></v-text-field>
                            <v-select
                            hide-details
                            ></v-select> 
                        </div>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import Moralis from 'moralis'
    export default {
        data() {
            return {
                list : []
            }
        },

        methods:{
            async init () {
                await Moralis.initPlugins();
                await Moralis.enable();
                const result = await Moralis.Plugins.oneInch.getSupportedTokens({
                    chain : 'eth'
                });
                console.log(result)
            }
        },

        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>

</style>