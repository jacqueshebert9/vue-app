<template>
    <q-modal v-model="isOpen" @hide="closeAdding" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Create a new team</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10 text-left" label="Image (optional)" label-width="12">
                    <image-chooser @change="changeFile"></image-chooser>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Invite your team (optional)</strong><br/>
                    <q-input v-for="(member, idx) in members" :key="idx" v-model="member.email" float-label="Email address"/>
                    <q-btn @click="addMember" class="q-mt-sm">INVITE MEMBER</q-btn>
                </q-field>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">create</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import ImageChooser from "../ImageChooser";

    export default {
        data: () => {
            return {
                form: {
                    name: ''
                },
                members: [],
                file: null,
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
                name: {
                    required
                }
            }
        },
        created() {
            document.title = 'Create a new team - Wonderus'
        },
        computed: {
            ...mapGetters({
                isProcessing: 'teams/isCreating'
            })
        },
        components: {
            ImageChooser,
            AppModalLayout
        },
        methods: {
            ...mapActions({
                create: 'teams/create',
                closeAdding: 'modals/closeCreateTeam'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.prepare()).then(this.closeAdding)
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                data.append('members', this.members.map(member => member.email).join(','));
                if (this.file !== null) {
                    data.append('file', this.file);
                }
                return data
            },
            changeFile(file) {
                this.file = file
            },
            addMember() {
                this.members.push({email: ''})
            }
        }
    }
</script>