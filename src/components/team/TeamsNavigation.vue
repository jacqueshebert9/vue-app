<template>
    <div>
        <div class="q-pl-md">
            <q-select filter :options="options" v-model="selected"/>
        </div>
        <q-list link no-border class="teams-navigation q-mt-lg">
            <q-item :to="`/teams/${id}`" :class="{active:isActive('view')}">
                <q-icon name="info" size="1.4rem" class="q-mr-sm"/>
                About
            </q-item>
            <q-item :to="`/teams/${id}/members`" :class="{active:isActive('members')}">
                <q-icon name="group" size="1.4rem" class="q-mr-sm"/>
                Members
            </q-item>
            <q-item :to="`/teams/${id}/plan`" :class="{active:isActive('plan')}" v-if="isManager">
                <q-icon name="account_balance_wallet" size="1.4rem" class="q-mr-sm"/>
                Plan
            </q-item>
        </q-list>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                selected: null,
                patterns: {
                    view: '^/teams/[0-9]+$',
                    plan: '^/teams/[0-9]+/plan$',
                    members: '^/teams/[0-9]+/members$'
                }
            }
        },
        watch: {
            id: function(val) {
                this.selected = parseInt(val)
            },
            selected: function (val, old) {
                if (!val || !old) return;

                this.$router.push(`/teams/${val}`)
            }
        },
        computed: {
            ...mapGetters({
                teams: 'teams/all',
				isManager: 'teams/isManager'
            }),
            id() {
                return this.$route.params.id
            },
            options() {
                return this.teams.map(team => {
                    return {value: team.id, label: team.name}
                })
            }
        },
        created() {
            this.selected = parseInt(this.$route.params.id)
        },
        methods: {
            isActive(name) {
                const pattern = this.patterns[name] || '';

                return this.$route.fullPath.match(pattern)
            }
        }
    }
</script>
<style lang="scss">
    .teams-navigation {
        .q-item {
            border-left: solid 10px transparent;
            padding: 8px 25px;

            &.router-link-active, &.router-link-exact-active {
                background: none;
            }

            &.active, &:hover {
                background: none;
                border-left-color: #2fab65;
                color: #2fab65
            }
        }
    }

    @media (max-width: 991px) {
        .teams-navigation {
            display: flex;
        }
    }
</style>
