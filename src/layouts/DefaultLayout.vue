<template>
    <q-layout>
        <app-header/>
        <q-page-container>
            <q-page>
                <div class="row q-ma-sm lt-lg" v-show="team">
                    <div class="col-xs-2 col-sm-1">
                        <q-btn flat icon="menu" class="q-mt-xs">
                            <q-popover>
                                <q-list link class="mobile-site-navigation">
                                    <q-item to="/">
                                        <q-item-side icon="home"/>
                                        <q-item-main>
                                            <q-item-tile>Feed</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/glossary">
                                        <q-item-side icon="library_books"/>
                                        <q-item-main>
                                            <q-item-tile>Glossary</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/requests">
                                        <q-item-side icon="help"/>
                                        <q-item-main>
                                            <q-item-tile>Requests</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/integrations" v-if="team && team.isOwner">
                                        <q-item-side icon="swap_vert"/>
                                        <q-item-main>
                                            <q-item-tile>Integrations</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </q-btn>
                    </div>
                    <div class="col-xs-10 col-sm-11">
                        <search-form class="full-width"/>
                    </div>
                </div>
                <router-view :key="$route.fullPath"/>
            </q-page>
        </q-page-container>
        <app-footer/>
        <dialogs-store/>
        <p class="back-to-top" v-if="scrolled" v-scroll-to="{el: '#q-app'}">&uarr;</p>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'
    import SearchForm from '../components/SearchForm'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        data () {
            return {
                scrolled: false
            };
        },
        methods: {
            handleScroll () {
                this.scrolled = window.scrollY > 200;
            }
        },
        beforeMount () {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        components: {
            SearchForm,
            AppHeader,
            AppFooter,
            DialogsStore
        }
    }
</script>
<style lang="scss">
    .back-to-top{
        background: #2fab65;
        color: #fff;
        position: fixed;
        right: 15px;
        bottom: 50px;
        width: 45px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        padding-top: 6px;
        cursor: pointer;
    }
    .mobile-site-navigation {
        .q-item {
            &.router-link-active, &.router-link-exact-active {
                background: none;
            }
        }
    }
</style>
