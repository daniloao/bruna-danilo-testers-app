import Vue from 'vue';
import MessageService from '@/services/message-service';

export default {
    resource: undefined,
    customActions: {
        login: { method: 'POST', url: 'account/login' },
        register: { method: 'POST', url: 'account/register' },
        isAuthenticated: { method: 'POST', url: 'account/isAuthenticated' },
        hasRole: { method: 'POST', url: 'account/hasRole' },
        getRoles: { method: 'POST', url: 'account/getRoles' },
        logOut: { method: 'POST', url: 'account/logOut' },
        refreshToken: { method: 'GET', url: 'account/refreshToken' }
    },
    setUp() {
        if (this.resource === undefined) {
            this.resource = Vue.resource('', {}, this.customActions);
        }
    },
    logOutApi() {
        this.setUp();
        return this.resource.logOut();
    },
    login(user) {
        const loader = Vue.prototype.$loading.show();

        this.setUp();
        user.name = user.email;
        return this.resource.login(user).then((response) => {
            this.setCurrentUser(response.data.token);
            loader.hide();
            return response;
        }, () => {
            loader.hide();
        });
    },
    register(user) {
        const loader = Vue.prototype.$loading.show();

        this.setUp();
        user.name = user.email;
        return this.resource.register(user).then((response) => {
            this.setCurrentUser(response.data.token);
            loader.hide();
            return response;
        }, () => {
            loader.hide();
        });
    },
    decodeJwtToken(tkn) {
        const arr = tkn.split('.');
        return {
            header: JSON.parse(atob(arr[0])),
            payload: JSON.parse(atob(arr[1])),
            secret: arr[2]
        };
    },
    logOut() {
        this.removeSession();

        if (Vue.ls.get('user')) {
            this.logOutApi();
        }

        this.removeLogin();
        window.location = '/';
    },
    removeLogin() {
        Vue.ls.remove('user');
    },
    removeSession() {
        Vue.ls.remove('roles');
        Vue.ls.remove('lastSessionLoad');
    },
    isAuthenticated() {
        this.refreshToken();
        return Vue.ls.get('user') !== null;
    },
    refreshToken() {
        this.setUp();

        if (!Vue.ls.get('user')) {
            this.removeSession();
            return Promise.resolve();
        }
        const lastSessionLoad = Vue.ls.get('lastSessionLoad');

        if (lastSessionLoad) {
            const lastSessionLoadDate = new Date(lastSessionLoad);
            const agora = new Date();
            lastSessionLoadDate.setMinutes(lastSessionLoadDate.getMinutes() + 2);
            if (agora < lastSessionLoadDate) {
                return Promise.resolve();
            }
        }

        return this.resource.refreshToken().then((response) => {
            this.setCurrentUser(response.data.token);
            return response;
        }, (error) => {
            console.error(error);
            MessageService.warn('Parece que sua sessão expirou, favor faca o login novamente.', 'Sessão expirada');
            this.logOut();
            return error;
        });
    },
    setCurrentUser(token) {
        const result = this.decodeJwtToken(token);

        Vue.ls.set('user', {
            email: result.payload.email,
            name: result.payload.email,
            token: token
        });
        Vue.ls.set('roles', result.payload.role);
        Vue.ls.set('lastSessionLoad', new Date());
    },
    hasRole(roleName) {
        this.setUp();
        this.refreshToken();

        const roles = Vue.ls.get('roles');

        if (!roles || roles.length <= 0) return false;

        if (!Array.isArray(roles)) {
            return roles === roleName;
        }

        const role = roles.find(r => r.roleId === roleName);

        return role !== null;
    },
    isAdmin() {
        return this.hasRole('ADMIN');
    }
};