<template>
    <div></div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        watch: {
            isMemberInviting: function (val) {
                if (!val) {
                    this.$router.push({name: 'view_team', params: {id: this.id}})
                }
            }
        },
        computed: {
            ...mapGetters({
                isMemberInviting: 'modals/isInviteMemberOpen',
            })
        },
        created() {
            this.invite(this.id)
        },
        methods: {
            ...mapActions({
                invite: 'modals/openInviteMember',
            })
        }
    }
</script>