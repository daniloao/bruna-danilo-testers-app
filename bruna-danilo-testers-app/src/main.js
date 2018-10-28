// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import AccountService from '@/services/account-service';
import MessageService from '@/services/message-service';
import VueSimpleSuggest from 'vue-simple-suggest/dist/es7';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import 'nprogress/nprogress.css';
import 'vue-material/dist/vue-material.css';
import 'vue-good-table/dist/vue-good-table.css';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-simple-suggest/dist/styles.css';
import 'vue-datetime/dist/vue-datetime.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import '@/assets/site.css';
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import CxltToastr from 'cxlt-vue2-toastr';
import Datetime from 'vue-datetime';
import Loading from 'vue-loading-overlay';
import VModal from 'vue-js-modal';
import NProgress from 'nprogress';
import VueLocalStorage from 'vue-ls';
import VuejsDialog from 'vuejs-dialog';
import BootstrapVue from 'bootstrap-vue';
import VueGoodTablePlugin from 'vue-good-table';
import { ModelSelect } from 'vue-search-select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VTooltip from 'v-tooltip';
import VueMaterial from 'vue-material';
import Multiselect from 'vue-multiselect';
import VueMask from 'v-mask';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import Snotify from 'vue-snotify';

Vue.use(CxltToastr, {
    position: 'top right',
    showDuration: 1000,
    hideDuration: 1000,
    timeOut: 3500
});
Vue.use(Datetime);
Vue.use(Loading);
Vue.use(VModal);
Vue.use(VueGoodTablePlugin);
Vue.use(Snotify);
Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.use(VueMask);
Vue.use(VueMaterial);
Vue.use(VTooltip);
Vue.use(VueResource);
Vue.use(VuejsDialog);
Vue.use(BootstrapVue);
Vue.use(VueLocalStorage, {
    namespace: 'testers_'
});

library.add(fab);
library.add(fas);
library.add(far);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('model-select', ModelSelect);
Vue.component('vue-simple-suggest', VueSimpleSuggest);
Vue.component('multiselect', Multiselect);

Vue.http.options.root = process.env.API_URL_ADDRESS;
Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
    NProgress.start();
    const user = Vue.ls.get('user');
    if (user && user.token) {
        request.headers.set('Authorization', `Bearer ${user.token}`);
    }

    next((response) => {
        NProgress.done();

        if (!response.ok) {
            console.error(response);
            if (response.statusText === 'Unauthorized') {
                MessageService.showNotification('Essa ação não foi autorizada, tente fazer o log out e log in novamente!', 'Não autorizado', 'error');
                AccountService.logOut();
            } else if (response.body.error === 'invalid_grant') {
                MessageService.showExpiredMessage();
                AccountService.logOut();
            } else {
                MessageService.error('Alguma coisa deu errado, estamos trabalhando para resolver o problema.', 'Desculpe!');
            }
        }
    });
});

(() => new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    render: h => h(App)
}))();