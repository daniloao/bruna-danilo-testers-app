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
          <div class="col col-md-6">
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
          <div class="col col-md-6">
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
          <div class="col col-md-6">
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
               :class="{'col-md-6': key <= 0, 'col-md-4': key > 0}"
               v-if="selectedTipoImagem[key] === '' ||
                     parseInt(selectedTipoImagem[key], 10) === tipoImagemConstant.url.id">
            <b-form-group horizontal
                          label="Imagem URL: "
                          label-class="text-sm-right"
                          label-for="url">
              <bd-validable-input type="text"
                                  placeholder="url"
                                  name="url"
                                  :model.sync="model.imagens[key].imagem.url"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :index="key"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col"
               :class="{'col-md-6': key <= 0, 'col-md-4': key > 0}"
               v-if="selectedTipoImagem[key] !== '' &&
                     parseInt(selectedTipoImagem[key], 10) === tipoImagemConstant.upload.id">
            <b-form-group horizontal
                          label="Imagem: "
                          label-class="text-sm-right"
                          label-for="logo">
              <bd-validable-input type="file"
                                  placeholder="Upload imagem"
                                  name="logo"
                                  :model.sync="model.imagens[key].imagem.logo"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :index="key"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-2">
            <b-button @click="removeImagem(key)"
                      variant="danger"
                      v-if="key > 0">
              <font-awesome-icon icon="trash">
              </font-awesome-icon>&nbsp;Remover imagem
            </b-button>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-12 right-align">
            <b-button @click="adicionaImagem"
                      variant="success">
              <font-awesome-icon icon="plus">
              </font-awesome-icon>&nbsp;Adicionar imagem
            </b-button>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Titulo:"
                          label-class="text-sm-right"
                          label-for="titulo">
              <bd-validable-input type="text"
                                  placeholder="Titulo"
                                  name="titulo"
                                  :model.sync="model.titulo"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Texto:"
                          label-class="text-sm-right"
                          label-for="texto">
              <bd-validable-input type="textarea"
                                  placeholder="Texto"
                                  name="texto"
                                  :model.sync="model.texto"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Data inicio:"
                          label-class="text-sm-right"
                          label-for="dataInicio">
              <bd-validable-input type="datepicker"
                                  placeholder="Data inicio"
                                  name="dataInicio"
                                  :model.sync="model.dataInicio"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :min-datetime="minDatetimeInicio"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Data fim:"
                          label-class="text-sm-right"
                          label-for="dataFim">
              <bd-validable-input type="datepicker"
                                  placeholder="Data fim"
                                  name="dataFim"
                                  :model.sync="model.dataFim"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :min-datetime="minDatetimeFim"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Cliente: "
                          label-class="text-sm-right"
                          label-for="cliente">
              <bd-validable-input type="select"
                                  placeholder="Cliente"
                                  name="cliente"
                                  :model.sync="selectedCliente"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="clientes"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Link trackeado: "
                          label-class="text-sm-right"
                          label-for="linkTrackeado">
              <bd-validable-input type="text"
                                  placeholder="Link trackeado"
                                  name="linkTrackeado"
                                  :model.sync="model.linkTrackeado"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Chave: "
                          label-class="text-sm-right"
                          label-for="chave">
              <bd-validable-input type="text"
                                  placeholder="Digite uma chave para ajudar nas buscas"
                                  name="chave"
                                  :model.sync="model.chave"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-6"
               v-if="model.tipoCampanha.id === tipoCampanhaConstant.cupom.id">
            <b-form-group horizontal
                          label="Cupom: "
                          label-class="text-sm-right"
                          label-for="cupom">
              <bd-validable-input type="text"
                                  placeholder="Cupom"
                                  name="cupom"
                                  :model.sync="model.cupom"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-12">
            <h5>Localidades</h5>
            <bd-validable-input type="checkbox"
                                placeholder="É nacional?"
                                name="nacional"
                                :model.sync="model.nacional"
                                :atualizaModel="atualizaModel"
                                :modelState.sync="modelState"></bd-validable-input>
          </div>
        </div>
        <div class="row"
             v-if="!model.nacional">
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Estados: "
                          label-class="text-sm-right"
                          label-for="estados">
              <bd-validable-input type="multiselect"
                                  placeholder="Estados"
                                  name="estados"
                                  :model.sync="model.estados"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="estados"
                                  label="sigla"
                                  track-by="id"
                                  @remove="remove"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col col-md-6">
            <b-form-group horizontal
                          label="Cidades: "
                          label-class="text-sm-right"
                          label-for="cidade">
              <bd-validable-input type="multiselect"
                                  placeholder="Cidades"
                                  name="cidades"
                                  :model.sync="model.cidades"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"
                                  :options="cidades"
                                  label="nome"
                                  track-by="id"
                                  group-label="estado"
                                  group-values="cidades"
                                  :is-disabled="cidades.length <= 0"
                                  :loading="isLoadingCidades"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-button @click="salvar"
                      variant="primary">
              <font-awesome-icon icon="save">
              </font-awesome-icon>&nbsp;Salvar
            </b-button>
            <b-button @click="cancelar">
              <font-awesome-icon icon="ban">
              </font-awesome-icon>&nbsp;Cancelar
            </b-button>
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
import ClienteService from '@/services/cliente-service';
import IBGEService from '@/services/ibge-service';
import tipoImagem from '@/constants/tipo-imagem';
import tipoCampanha from '@/constants/tipo-campanha';
import moment from 'moment';
import _ from 'lodash';
// import MessageService from '@/services/message-service';


export default {
  watch: {
    tipoCampanha() {
      this.model.tipoCampanhaId = parseInt(this.tipoCampanha, 10);
    },
    selectedCliente() {
      this.model.clienteId = (this.selectedCliente, 10);
    },
    'model.dataInicio'() {
      this.minDatetimeFim = this.model.dataInicio;
    },
    'model.estados'() {
      this.loadCidades();
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
      isLoadingCidades: false,
      selectedTipoImagem: [],
      selectedCliente: '',
      anunciantes: [],
      tiposCampanha: [],
      loadingEstados: [],
      clientes: [],
      estados: [],
      cidades: [],
      tiposImagem: [],
      tipoCampanha: '',
      minDatetimeInicio: moment.utc().format(),
      minDatetimeFim: moment.utc().format(),
      model: {
        id: 0,
        chave: '',
        titulo: '',
        texto: '',
        tipoCampanhaId: 0,
        dataInicio: moment.utc().format(),
        dataFim: moment.utc().format(),
        linkTrackeado: '',
        cupom: '',
        nacional: true,
        clienteId: 0,
        estados: [],
        cidades: [],
        anunciante: {
          id: 0,
          nome: ''
        },
        imagens: []
      },
      modelState: {}
    };
  },
  methods: {
    remove(item) {
      const cidade = this.cidades.find(cd => cd.estado === item.sigla);
      if (cidade) {
        // Remove do combo de cidades
        const index = this.cidades.indexOf(cidade);
        this.$delete(this.cidades, index);

        // Remove as cidades selecionadas daquele estado
        const cidadesSelecionadas = this.model.cidades.filter(cd => cd.estado.sigla === item.sigla);
        if (cidadesSelecionadas) {
          cidadesSelecionadas.forEach((current) => {
            const indexSel = this.model.cidades.indexOf(current);
            this.$delete(this.model.cidades, indexSel);
          });
        }
      }
    },
    adicionaImagem() {
      this.selectedTipoImagem.push('');
      this.model.imagens.push({
        campanhaId: 0,
        imagemId: 0,
        imagem: {
          id: 0,
          tipoImagem: {
            id: 0
          },
          url: '',
          logo: null
        }
      });
    },
    anuncianteSelected(selected) {
      this.model.anunciante = selected;
    },
    salvar() {
      this.modelState = {};
    },
    cancelar() {
      this.$router.push('/campanhas');
    },
    removeImagem(index) {
      if (index > 0) {
        this.$delete(this.model.imagens, index);
        this.$delete(this.selectedTipoImagem, index);
      }
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
        this.$set(this.selectedTipoImagem, index, valor);
        this.model.imagens[index].imagem.tipoImagem.id = parseInt(valor, 10);
      } else if (propName === 'url') {
        this.model.imagens[index].imagem.url = valor;
      } else if (propName === 'logo') {
        this.model.imagens[index].imagem.logo = valor;
      } else if (propName === 'cliente') {
        this.selectedCliente = valor;
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
    },
    loadClientes() {
      ClienteService.getAll().then((resp) => {
        resp.data.forEach((current) => {
          this.clientes.push({
            value: `${current.id}`,
            text: `${current.nomeFantasia} - ${current.razaoSocial}`
          });
        });
      });
    },
    loadEstados() {
      return IBGEService.getEstados().then((response) => {
        this.estados = _.sortBy(response.data, [o => o.sigla]);
        return response;
      });
    },
    loadCidades() {
      this.model.estados.forEach((current) => {
        const loadedCidades = this.cidades.find(cid => cid.estado === current.sigla);
        const loadingEstados = this.loadingEstados.find(est => est === current.sigla);
        if (!loadedCidades && !loadingEstados) {
          this.loadingEstados.push(current.sigla);
          this.isLoadingCidades = true;
          IBGEService.getCidades(current.id).then((response) => {
            this.cidades.push({
              estado: current.sigla,
              cidades: _.sortBy(response.data, [o => o.nome])
            });
            const index = this.loadingEstados.indexOf(current.sigla);
            this.$delete(this.loadingEstados, index);
            this.isLoadingCidades = false;
          }, () => {
            this.isLoadingCidades = false;
          });
        }
      });
    }
  },
  computed: {
    tipoImagemConstant() {
      return tipoImagem;
    },
    tipoCampanhaConstant() {
      return tipoCampanha;
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
    this.loadClientes();
    this.loadEstados();
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
