<template>
    <div class="row flex-center window-height">
        <q-spinner-circles color="primary" :size="70"/>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props: {
            hash: {
                required: true,
                type: String
            }
        },
        computed: {
            ...mapGetters({
                accessToken: 'auth/token'
            })
        },
        mounted() {
            if (this.accessToken) {
                return this.join(this.hash).then(member => {
                    this.$router.push({name: 'view_team', params: {id: member.teamId}})
                })
            }
            localStorage.setItem('join-token', this.hash);
            this.$router.push({name: 'register_user'})
        },
        methods: {
            ...mapActions({
                join: 'members/joinMemberToTeam'
            })
        }
    }
</script>