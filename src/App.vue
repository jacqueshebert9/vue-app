<template>
    <div id="q-app" :class="{ darkmode: darkmode }">
        <q-ajax-bar :delay="100" size="2px" color="white"/>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        data() {
            return { darkmode: false }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        created() {
            if (localStorage.getItem('access-token') !== null) {
                this.loadAuthUser().then(res => {
                    this.loadFavorite();
                    this.loadPaidPlans();
                    this.loadUserRoles();
                    if (res.isSuperAdmin !== 1) {
                        this.loadUserTeams().then(teams => {
                            if (teams.length === 0) {
                                this.$router.push('/welcome')
                            }
                        });
                    }
                	this.darkmode = val.darkMode;

                }).catch(err => {
                    this.$router.push({name: 'login_user'})
                });
            }
        },
        watch: {
            user: function (val) {
                if (val !== null) {
                    this.darkmode = val.darkMode;

                    if (val.darkMode) {
                      document.body.style.backgroundColor = "rgb(17,18,21)";
                      document.body.classList.add('darkmode');
                    } else {
                      document.body.className = document.body.className.replace(/\bdarkmode\b/,'');
                      document.body.style.backgroundColor = "";
                    }

                    this.logCanny(val);
                }
            }
        },
        methods: {
            ...mapActions({
                logout: 'auth/flush',
                loadAuthUser: 'auth/user',
                loadPaidPlans: 'plans/all',
                loadUserTeams: 'teams/all',
                loadFavorite: 'users/loadFavorite',
                loadUserRoles: 'users/loadRoles'
            }),
            logCanny(user) {
                Canny('identify', {
                    appID: '5b6c996d366d036c04d07a62',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.firstName,
                        avatarURL: user.photo
                    }
                })
            }
        },
    }
</script>

<style>
</style>
