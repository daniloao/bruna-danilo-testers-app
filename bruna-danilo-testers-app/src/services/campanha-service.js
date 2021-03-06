import Vue from 'vue';

export default {
    resource: undefined,
    customActions: {
        getAnunciantes: { method: 'GET', url: 'campanha/anunciantes' },
        getTiposCampanha: { method: 'GET', url: 'campanha/tiposCampanha' },
        getTiposImagem: { method: 'GET', url: 'campanha/tiposImagem' },
        save: { method: 'POST', url: 'campanha/save' }
    },
    setUp() {
        if (this.resource === undefined) {
            this.resource = Vue.resource('', {}, this.customActions);
        }
    },
    getAnunciantes() {
        this.setUp();
        return this.resource.getAnunciantes();
    },
    getTiposCampanha() {
        this.setUp();
        return this.resource.getTiposCampanha();
    },
    getTiposImagem() {
        this.setUp();
        return this.resource.getTiposImagem();
    },
    save(model) {
        this.setUp();
        return this.resource.save(model);
    }
};