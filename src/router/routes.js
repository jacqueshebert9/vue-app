import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['auth/isAuthenticated']) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters['auth/isAuthenticated']) {
        next();
        return
    }
    store.dispatch('route/referer', to.path, {root: true});
    next('/auth/login')
};

export default [
    {
        path: '/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'home', component: () => import('pages/HomePage.vue')}
        ]
    },
    {
        path: '/super-admin',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'super_admin', component: () => import('pages/SuperAdminPage.vue')}
        ]
    },
    {
        path: '/welcome',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'welcome', component: () => import('pages/WelcomePage.vue'), props: true}
        ]
    },
    {
        path: '/join/',
        component: () => import('layouts/ClearLayout.vue'),
        children: [
            {path: ':hash', name: 'join_team', component: () => import('pages/team/JoinTeamPage.vue'), props: true}
        ]
    },
    {
        path: '/ask-help/',
        component: () => import('layouts/ClearLayout.vue'),
        children: [
            {path: '', name: 'ask_help', component: () => import('pages/team/AskHelpPage.vue'), props: true}
        ]
    },
    {
        path: '/auth/',
        component: () => import('layouts/AuthLayout.vue'),
        beforeEnter: ifNotAuthenticated,
        children: [
            {path: 'login', name: 'login_user', component: () => import('pages/auth/LoginUserPage.vue')},
            {path: 'register', name: 'register_user', component: () => import('pages/auth/RegisterUserPage.vue')},
            {path: 'forgot', name: 'forgot_password', component: () => import('pages/auth/ForgotPasswordPage.vue')},
            {path: 'reset/:token', name: 'reset_password', component: () => import('pages/auth/ResetPasswordPage.vue')}
        ]
    },
    {
        path: '/openid/',
        component: () => import('layouts/ClearLayout.vue'),
        children: [
            {path: 'redirect', name: 'openid_redirect', component: () => import('pages/openid/RedirectPage.vue')}
        ]
    },
    {
        path: '/slack/',
        component: () => import('layouts/ClearLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: 'redirect', name: 'slack_redirect', component: () => import('pages/slack/SlackRedirectPage.vue')}
        ]
    },
    {
        path: '/search/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'search_cards', component: () => import('pages/card/SearchCardsPage.vue')},
        ]
    },
    {
        path: '/profile/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'profile', component: () => import('pages/user/UserProfilePage.vue')},
        ]
    },
    {
        path: '/glossary/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: 'create', name: 'create_card', component: () => import('pages/card/CreateCardPage.vue')},
            {path: 'table', name: 'cards_table', component: () => import('pages/card/CardsTablePage.vue')},
            {path: 'favorites', name: 'saved_cards', component: () => import('pages/card/SavedCardsPage.vue')},
            {path: 'tags', name: 'cards_tags', component: () => import('pages/card/TagsPage.vue')},
            {path: ':id', name: 'view_card', component: () => import('pages/card/ViewCardPage.vue'), props: true},
            {path: ':id/edit', name: 'edit_card', component: () => import('pages/card/EditCardPage.vue'), props: true},
            {
                path: 'tag/create',
                name: 'create_card_tag',
                component: () => import('pages/card/CreateCardTagPage.vue')
            },
            {
                path: 'tag/:name/edit',
                name: 'edit_card_tag',
                component: () => import('pages/card/EditCardTagPage.vue')
            },
            {
                path: 'tag/:name',
                name: 'tag_cards',
                component: () => import('pages/card/TagCardsPage.vue')
            },
            {path: '', name: 'cards_list', component: () => import('pages/card/CardsListPage.vue')}
        ]
    },
    {
        path: '/teams/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'team_redirector', component: () => import('pages/team/TeamRedirectorPage.vue')},
            {path: 'plan', name: 'plan_redirector', component: () => import('pages/team/TeamRedirectorPage.vue')},
            {path: 'members', name: 'members_redirector', component: () => import('pages/team/TeamRedirectorPage.vue')},
        ]
    },
    {
        path: '/teams/',
        component: () => import('layouts/TeamLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: 'create', name: 'create_team', component: () => import('pages/team/CreateTeamPage.vue')},
            {path: ':id/members', name: 'team_members', component: () => import('pages/team/TeamMembersPage.vue'), props: true},
            {path: ':id/plan', name: 'team_plan', component: () => import('pages/team/TeamPlanPage.vue'), props: true},
            {
                path: ':id/invite',
                name: 'invite_member',
                component: () => import('pages/team/InviteMemberPage.vue'),
                props: true
            },
            {
                path: ':id/change-role/:memberId',
                name: 'change_role',
                component: () => import('pages/team/ChangeRolePage.vue'),
                props: true
            },
            {path: ':id', name: 'view_team', component: () => import('pages/team/ViewTeamPage.vue'), props: true},
        ]
    },
    {
        path: '/requests/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'questions', component: () => import('pages/question/OpenQuestionsPage.vue')},
            {
                path: 'answered',
                name: 'answered_questions',
                component: () => import('pages/question/AnsweredQuestionsPage.vue')
            },
            {path: 'my', name: 'my_questions', component: () => import('pages/question/UserQuestionsPage.vue')}
        ]
    },
    {
        path: '/content-packs/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'content-packs', component: () => import('pages/contentpacks/ContentPackListPage.vue')},
            {path: 'subscribed', name: 'subscribed', component: () => import('pages/contentpacks/ContentPackListPage.vue')},
            {path: ':id/items', name: 'content_pack_items', component: () => import('pages/contentpacks/ContentPackItemsListPage.vue'), props: true},
        ]
    },
    {
        path: '/integrations/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'integrations', component: () => import('pages/integration/IntegrationsListPage.vue')},
        ]
    },
    {
        path: '/public-sites/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'edit_public_site', component: () => import('pages/public-sites/EditPublicSitePage.vue')},
        ]
    },
    {
        path: '/for/',
        component: () => import('layouts/PublicSiteLayout.vue'),
        children: [
            {
                path: ':name/glossary',
                name: 'public_site_glossary',
                component: () => import('pages/public-sites/PublicSiteGlossaryPage.vue')
            },
            {
                path: ':name/search',
                name: 'public_site_search',
                component: () => import('pages/public-sites/PublicSiteSearchPage.vue')
            },
            {
                path: ':name/tag/:tag',
                name: 'public_site_tag',
                component: () => import('pages/public-sites/PublicSiteTagPage.vue')
            },
            {
                path: ':name/:cardId',
                name: 'public_site_card',
                component: () => import('pages/public-sites/PublicSiteCardPage.vue')
            },
            {
                path: ':name',
                card: 'card_id',
                name: 'public_site',
                component: () => import('pages/public-sites/PublicSitePage.vue')
            }
        ]
    },
    {
        path: '/404',
        name: 'not_found',
        component: () => import('pages/404')
    },
    { // Always leave this as last one
        path: '*',
        component: () => import('pages/404')
    }
]
