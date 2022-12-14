<template>
    <div class="content-container">
        <div class="row">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-10 q-pr-md">
                <q-table
                        :title="title"
                        :data="items"
                        :columns="table.columns"
                        :visible-columns="table.visible"
                        :pagination.sync="table.pagination"
                        :filter="filter.name"
                        row-key="id"
                        :loading="isCardsLoading"
                        @update:pagination="fixSorting"
                        class="bg-white">

                    <tr slot="header" slot-scope="props">
                        <q-th key="name" :props="props">
                            <q-input v-model.lazy="filter.name" float-label="Card Name" style="display: inline-block"/>
                        </q-th>
                        <q-th key="shorthand" :props="props">
                            <q-input v-model.lazy="filter.shorthand" float-label="Shorthand" style="display: inline-block"/>
                        </q-th>
                        <q-th key="description" :props="props">
                            <q-input v-model.lazy="filter.description" float-label="Description"/>
                        </q-th>
                        <q-th key="tags" :props="props">
                            <q-select v-model="filter.tag" :options="options" float-label=" "/>
                        </q-th>
                        <q-th key="updatedAt" :props="props">
                            Last Updated
                        </q-th>
                    </tr>


                    <q-td slot="body-cell-name" slot-scope="props" :props="props">
                        <a :href="createViewUrl(props.row)" @click.prevent.stop="showCard(props.row.id)">{{props.value}}</a>
                    </q-td>
                    <q-td slot="body-cell-shorthand" slot-scope="props" :props="props" style="max-width: 200px;white-space: normal">
                        <em>{{props.value.join(', ')}}</em>
                    </q-td>
                    <q-td slot="body-cell-description" slot-scope="props" :props="props" style="max-width: 500px;white-space: normal">
                        {{truncate(clearMarks(props.value))}}
                    </q-td>
                    <q-td slot="body-cell-tags" slot-scope="props" :props="props" style="max-width: 300px;white-space: normal">
                        <q-chip v-for="(col, idx) in props.value" :key="idx" small color="primary" class="q-ma-xs">#{{col.name}}</q-chip>
                    </q-td>
                    <q-td slot="body-cell-updatedAt" slot-scope="props" :props="props">
                        <em>{{toLocaleString(props.value)}}</em>
                    </q-td>
                </q-table>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import DateFormatter from '../../mixins/DateFormatter'
    import Markdown from '../../mixins/Markdown'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        data: () => ({
            items: [],
            filter: {
                name: '',
                shorthand: '',
                description: '',
                tag: ''
            },
            options: [],
            table: {
                visible: [
                    'name', 'shorthand', 'description', 'tags', 'updatedAt'
                ],
                columns: [
                    {
                        name: 'id',
                        label: 'ID',
                        field: 'id',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Card Name',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                    },
                    {
                        name: 'shorthand',
                        required: true,
                        label: 'Shorthand',
                        align: 'left',
                        field: 'shorthand',
                    },
                    {
                        name: 'description',
                        label: 'Card Description',
                        field: 'description',
                        align: 'left'
                    },
                    {
                        name: 'tags',
                        label: 'Tags',
                        field: 'tags',
                        align: 'left'
                    },
                    {
                        name: 'updatedAt',
                        label: 'Last Updated',
                        field: 'updatedAt',
                        align: 'right',
                        sortable: true,
                    }
                ],
                pagination: {
                    page: 1,
                    rowsPerPage: 100,
                    sortBy: 'updatedAt',
                    descending: true
                }
            },

        }),
        mixins: [DateFormatter, Markdown],
        computed: {
            ...mapGetters({
                team: 'teams/current',
                cards: 'cards/getItems',
                tags: 'tags/allNonEmpty',
                isCardsLoading: 'cards/isCardsLoading',
                getFilteredItems: 'cards/getFilteredItems'
            }),
            title() {
                if (this.team !== null) {
                    return `${this.team.name}'s Cards`
                }
                return 'All Cards'
            }
        },
        watch: {
            'filter.name': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            'filter.shorthand': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            'filter.description': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            'filter.tag': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            cards: function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            team: function (val) {
                if (val !== null) {
                    this.load();
                }
            },
            tags: function (val) {
                this.fillOptions(val)
            },
        },
        components: {SiteNavigation},
        created() {
            this.load();
            document.title = this.title;
            this.fillOptions(this.tags);
        },
        methods: {
            ...mapActions({
                load: 'cards/all',
                showCard: 'modals/openCardsEditor',
            }),
            fixSorting(e) {
                if (e.sortBy === null) {
                    this.table.pagination.sortBy = 'updatedAt';
                    this.table.pagination.descending = !this.table.pagination.descending
                }
            },
            fillOptions(tags) {
                this.options = [{value: '', label: 'Tags'}];

                tags.forEach(item => {
                    if (item.cards > 0) {
                        this.options.push({value: item.id, label: item.name})
                    }
                })
            },
            truncate(str) {
                if (str.length <= 250) {
                    return str
                }
                return str.substring(0, 250) + '...'
            },
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            }
        }
    }

</script>