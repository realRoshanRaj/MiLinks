<template>
    <nav v-if="!hide">
        <v-toolbar>
            <v-toolbar-title>
                <nuxt-link
                        to="/"
                        style="text-decoration: none; color: inherit;"
                >
                    <v-avatar>
                        <img
                                src="/LogoMiLinks.png"
                                alt="Logo"
                        >
                    </v-avatar>
                    <span v-if="$vuetify.breakpoint.smAndUp">MiLinks</span>
                </nuxt-link>
            </v-toolbar-title>
            <v-spacer/>
            <v-switch
                    v-model="$vuetify.theme.dark"
                    label="Dark Theme"
            />
            <div v-if="!hideEndButtons">
                <div v-if="authenticated">
                    <v-btn
                            color="mainGreen"
                            rounded
                            @click="logout"
                    >
                        Logout
                    </v-btn>
                </div>
                <div v-else>


                    <v-btn
                            class="mx-2"
                            rounded
                            text
                            to="/login"
                            @click="showLoginForm = !showLoginForm"
                    >
                        Login
                    </v-btn>
                    <v-btn
                            color="mainGreen"
                            rounded
                            to="/register"
                    >
                        Sign up
                    </v-btn>
                </div>
            </div>
        </v-toolbar>
    </nav>
</template>

<script>
    export default {
        name: "NavBar",
        data: () => ({
            showLoginForm: false,
        }),
        props: {
            hide: {
                type: Boolean,
                default: false
            },
            hideEndButtons: {
                type: Boolean,
                default: false
            },
            authenticated: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            async logout() {
               const data = await this.$axios.$get('/users/logout');
               if(data.success) {
                   this.$store.commit('setUser', null);
               }
            }
        }
    }
</script>

<style scoped>

</style>
