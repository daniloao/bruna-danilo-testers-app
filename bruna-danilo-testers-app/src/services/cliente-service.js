import Vue from 'vue';

export default {
    resource: undefined,
    customActions: {
        getClientes: { method: 'POST', url: 'cliente/clientes' },
        saveCliente: { method: 'POST', url: 'cliente/save' },
        getCliente: { method: 'GET', url: 'cliente/cliente' },
        deleteCliente: { method: 'DELETE', url: 'cliente/delete' }
    },
    setUp() {
        if (this.resource === undefined) {
            this.resource = Vue.resource('', {}, this.customActions);
        }
    },
    getClientes(model) {
        this.setUp();
        return this.resource.getClientes(model);
    },
    saveCliente(model) {
        const loader = Vue.prototype.$loading.show();
        this.setUp();
        return this.resource.saveCliente(model).then((res) => {
            loader.hide();
            return res;
        }, (error) => {
            loader.hide();
            throw error;
        });
    },
    getCliente(id) {
        this.setUp();
        return this.resource.getCliente({ id: id });
    },
    deleteCliente(id) {
        this.setUp();
        return this.resource.deleteCliente({ clienteId: id });
    }
};