<template>
  <div>
    <b-card bg-variant="light"
            class="login-box">
      <b-form-group vertical
                    breakpoint="lg"
                    :label="title"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0">
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="Nome anunciante:"
                          label-class="text-sm-right"
                          label-for="anunciante">
              <bd-validable-input type="suggest"
                                  name="anunciante"
                                  placeholder="Anunciante"
                                  :model.sync="model.anunciante.nome"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="anunciantes"
                                  @suggest-selected="anuncianteSelected"></bd-validable-input>
              <span name="anunciante"
                    v-if="model.anunciante.id > 0">Selecionado
                anunciante:
                <b>
                  {{
                  model.anunciante.id }} - {{ model.anunciante.nome
                  }}
                </b></span>
              <span name="anunciante"
                    v-if="!model.anunciante.id || model.anunciante.id <= 0">novo</span>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Tipo de Campanha:"
                          label-class="text-sm-right"
                          label-for="tipoCampanha">
              <bd-validable-input type="select"
                                  placeholder="Tipo de campanha"
                                  name="tipoCampanha"
                                  :model.sync="tipoCampanha"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="tiposCampanha"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row"
             v-for="(imagem, key) in model.imagens"
             :key="key">
          <div class="col">
            <b-form-group horizontal
                          label="Tipo de Imagem:"
                          label-class="text-sm-right"
                          label-for="tipoImagem">
              <bd-validable-input type="select"
                                  placeholder="Tipo de imagem"
                                  name="tipoImagem"
                                  :model.sync="selectedTipoImagem[key]"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="tiposImagem"
                                  :index="key"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col"
               v-if="selectedTipoImagem[key] === '' ||
                     parseInt(selectedTipoImagem[key], 10) === tipoImagemConstant.url.id">
            <b-form-group horizontal
                          label="Imagem URL"
                          label-class="text-sm-right"
                          label-for="url">
              <bd-validable-input type="text"
                                  placeholder="url"
                                  name="url"
                                  :model.sync="model.imagens[key].url"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :index="key"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col"
               v-if="selectedTipoImagem[key] !== '' &&
                     parseInt(selectedTipoImagem[key], 10) === tipoImagemConstant.upload.id">
            <b-form-group horizontal
                          label="Imagem URL"
                          label-class="text-sm-right"
                          label-for="log">
              <bd-validable-input type="text"
                                  placeholder="Upload imagem"
                                  name="logo"
                                  :model.sync="model.imagens[key].logo"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :index="key"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-button @click="adicionaImagem"
                      variant="success">Adicionar imagem</b-button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-button @click="salvar"
                      variant="primary">Salvar</b-button>
            <b-button @click="cancelar">Cancelar</b-button>
          </div>
        </div>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bCard from 'bootstrap-vue/es/components/card/card';
import BdValidableInput from '@/components/directives/BdValidableInput';
import CampanhaService from '@/services/campanha-service';
import tipoImagem from '@/constants/tipo-imagem';
// import MessageService from '@/services/message-service';


export default {
  watch: {
    tipoCampanha() {
      this.model.tipoCampanha.id = parseInt(this.tipoCampanha, 10);
    }
  },
  components: {
    bButton,
    bFormGroup,
    bCard,
    BdValidableInput
  },
  data() {
    return {
      selectedTipoImagem: [],
      anunciantes: [],
      tiposCampanha: [],
      tiposImagem: [],
      tipoCampanha: '',
      model: {
        id: 0,
        anunciante: {
          id: 0,
          nome: ''
        },
        tipoCampanha: {
          id: 0
        },
        imagens: []
      },
      modelState: {}
    };
  },
  methods: {
    adicionaImagem() {
      this.selectedTipoImagem.push('');
      this.model.imagens.push({
        id: 0,
        tipoImagem: {
          id: 0
        },
        url: '',
        logo: null
      });
    },
    anuncianteSelected(selected) {
      this.model.anunciante = selected;
    },
    salvar() {
      this.modelState = {};
    },
    cancelar() {
      this.$modal.hide('edit-cliente');
    },
    atualizaModel(propName, valor, index) {
      if (propName === 'anunciante') {
        this.model.anunciante = {
          id: 0,
          nome: valor
        };
      } else if (propName === 'tipoCampanha') {
        this.tipoCampanha = valor;
      } else if (propName === 'tipoImagem') {
        this.selectedTipoImagem[index] = valor;
        this.model.imagens[index].tipoImagem.id = parseInt(valor, 10);
      } else if (propName === 'url') {
        this.model.imagens[index].url = valor;
      } else if (propName === 'logo') {
        this.model.imagens[index].logo = valor;
      } else {
        this.model[propName] = valor;
      }
      console.log(this.model);
    },
    loadAnunciantes() {
      CampanhaService.getAnunciantes().then((resp) => {
        this.anunciantes = resp.data;
      });
    },
    loadTiposCampanha() {
      CampanhaService.getTiposCampanha().then((resp) => {
        resp.data.forEach((current) => {
          this.tiposCampanha.push({
            value: `${current.id}`,
            text: current.descricao
          });
        });
      });
    },
    loadTiposImagem() {
      CampanhaService.getTiposImagem().then((resp) => {
        resp.data.forEach((current) => {
          this.tiposImagem.push({
            value: `${current.id}`,
            text: current.nome
          });
        });
      });
    }
  },
  computed: {
    tipoImagemConstant() {
      return tipoImagem;
    },
    title() {
      if (this.model.id > 0) {
        return `Campanha ID: ${this.model.id}`;
      }
      return 'Nova campanha';
    }
  },
  created() {
    this.loadAnunciantes();
    this.loadTiposCampanha();
    this.loadTiposImagem();
    this.adicionaImagem();
  }
};
</script>

<style scoped>
#estadoDiv {
  width: 50%;
  margin-bottom: 40px;
  margin-left: 0;
}

#cidadeDiv {
  width: 100%;
  margin-bottom: 40px;
  margin-left: 0;
}
</style>
