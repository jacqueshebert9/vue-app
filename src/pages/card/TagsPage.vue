<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row q-mb-lg">
                    <div class="col q-headline">Tags</div>
                </div>
                <div class="q-card full-width empty_card" v-show="tags.length == 0">
                    <h2>No tags yet!</h2>
                    <p>You can create tags to organize your cards by selecting the <i aria-hidden="true" class="q-icon material-icons">local_offer</i></i> icon from a card.</p>
                    <q-btn no-caps color="primary" label="Create a card" class="q-mr-md q-mb-md" @click="createCard"/>
                </div>
                <tags-grid-list :items="tags"></tags-grid-list>
            </div>
            <!--<div class="col-lg-3 q-px-xl gt-md">-->
                <!--<q-btn no-caps color="primary" label="Create a tag" @click="createCardTag" class="full-width q-mb-md"/>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import TagsGridList from '../../components/card/TagsGridList.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        created() {
            document.title = this.title
        },
        watch: {
            team: function (val) {
                document.title = this.title
            }
        },
        computed: {
            ...mapGetters({
                tags: 'tags/allNonEmpty',
                team: 'teams/current',
            }),
            title() {
                if (this.team === null) {
                    return 'Tags - Wonderus'
                }
                return `${this.team.name} Tags - Wonderus`
            }
        },
        components: {
            TagsGridList, SiteNavigation
        },
        methods: {
            ...mapActions({
                createCardTag: 'modals/openCreateCardTag',
                createCard: 'editor/create',
            })
        }
    }
</script>