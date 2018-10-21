import Vue from 'vue';
// import router from '@/router';

export default {
    el: '#app',
    showAlert(title, message) {
        return Vue.dialog.alert({
            title,
            body: message
        }, {
            okText: 'Ok',
            animation: 'fade',
            backdropClose: true
        });
    },
    showConfirm(title, message) {
        return Vue.dialog.confirm({
            title,
            body: message
        }, {
            okText: 'Yes',
            animation: 'fade',
            backdropClose: true,
            cancelText: 'No'
        });
    },
    showNotification(message, title, variant = 'success') { // , title, duration = 6000, type = 'warn') {
        switch (variant) {
            case 'success':
                this.success(message, title);
                break;
            case 'warn':
                this.warn(message, title);
                break;
            case 'error':
                this.error(message, title);
                break;
            default:
                this.info(message, title);
                break;
        }
    },
    success(message, title) {
        Vue.prototype.$toast.success({
            title: title,
            message: message
        });
    },
    info(message, title) {
        Vue.prototype.$toast.info({
            title: title,
            message: message
        });
    },
    warn(message, title) {
        Vue.prototype.$toast.warn({
            title: title,
            message: message
        });
    },
    error(message, title) {
        Vue.prototype.$toast.error({
            title: title,
            message: message
        });
    },
    clearNotification() { // , title, duration = 6000, type = 'warn') {
        Vue.prototype.$toast.removeAll();
    },
    showExpiredMessage() {
        this.showNotification('Sua sessão expirou, favor faça novamente o login!', 'Sessão expirada', 'error');
    }
};