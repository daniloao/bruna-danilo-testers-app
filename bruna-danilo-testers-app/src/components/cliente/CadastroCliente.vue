<template>
  <div>
    <b-card bg-variant="light"
            class="login-box">
      <b-form-group vertical
                    breakpoint="lg"
                    label="Cliente"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0">
        <div v-if="model.id > 0">
          <h6>ID: {{ model.id }}</h6>
        </div>
        <div v-if="!model.id || model.id <= 0">
          <h6>Novo Cliente</h6>
        </div>
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="CNPJ:"
                          label-class="text-sm-right"
                          label-for="cnpj">
              <bd-validable-input type="text"
                                  :mask="'##.###.###/####-##'"
                                  name="cnpj"
                                  placeholder="CNPJ"
                                  :model.sync="model.cnpj"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Razão Social:"
                          label-class="text-sm-right"
                          label-for="razaoSocial">
              <bd-validable-input type="text"
                                  name="razaoSocial"
                                  placeholder="Razão Social"
                                  :model.sync="model.razaoSocial"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="Nome Fantasia:"
                          label-class="text-sm-right"
                          label-for="nomeFantasia">
              <bd-validable-input type="text"
                                  name="nomeFantasia"
                                  placeholder="Nome Fantasia"
                                  :model.sync="model.nomeFantasia"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Contato:"
                          label-class="text-sm-right"
                          label-for="contato">
              <bd-validable-input type="text"
                                  name="contato"
                                  placeholder="Contato"
                                  :model.sync="model.contato"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="Email:"
                          label-class="text-sm-right"
                          label-for="email">
              <bd-validable-input type="text"
                                  name="email"
                                  placeholder="Email"
                                  :model.sync="model.email"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Endereço:"
                          label-class="text-sm-right"
                          label-for="endereco">
              <bd-validable-input type="text"
                                  name="endereco"
                                  placeholder="Endereço"
                                  :model.sync="model.endereco"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="Telefone:"
                          label-class="text-sm-right"
                          label-for="telefone">
              <bd-validable-input type="text"
                                  :mask="'(##) #####-####'"
                                  name="telefone"
                                  placeholder="Telefone"
                                  :model.sync="model.telefone"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Skype:"
                          label-class="text-sm-right"
                          label-for="skype">
              <bd-validable-input type="text"
                                  name="skype"
                                  placeholder="Skype"
                                  :model.sync="model.skype"
                                  :atualizaModel="atualizaModel"
                                  :modelState.sync="modelState"></bd-validable-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-form-group horizontal
                          label="Estado:"
                          label-class="text-sm-right"
                          label-for="cidadeEstado">
              <div id="estadoDiv">
                <bd-validable-input type="select"
                                    placeholder="UF"
                                    name="estado"
                                    :model.sync="estado"
                                    :atualizaModel="atualizaModel"
                                    :modelState.sync="modelState"
                                    :options="sortedEstados"></bd-validable-input>
              </div>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group horizontal
                          label="Cidade:"
                          label-class="text-sm-right"
                          label-for="cidadeEstado">
              <div id="cidadeDiv">
                <bd-validable-input type="select"
                                    placeholder="Cidade"
                                    name="cidade"
                                    :model.sync="cidade"
                                    :atualizaModel="atualizaModel"
                                    :modelState.sync="modelState"
                                    :options="sortedCidades"
                                    :isDisabled="cidades.length <= 0"></bd-validable-input>
              </div>
            </b-form-group>
          </div>
        </div>
        <div class="row center-align">
          <div class="col col-md-12">
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
import IBGEService from '@/services/ibge-service';
import ClienteService from '@/services/cliente-service';
import MessageService from '@/services/message-service';
import _ from 'lodash';

export default {
  watch: {
    'model.estadoId'() {
      if (this.cidades.length <= 0) this.model.cidadeId = 0;
      this.cidadesEstadosModelState = [];
      this.cidades = [];
      if (this.model.estadoId > 0) {
        const est = this.model.estadoId.toString();
        if (est !== this.estado) this.estado = est;
        this.loadCidades(this.model.estadoId);
      }
    },
    'model.cidadeId'() {
      const cid = this.model.cidadeId.toString();
      if (cid !== this.cidade) this.cidade = cid;
      this.cidadesEstadosModelState = [];
    },
    estado() {
      this.model.estadoId = parseInt(this.estado, 10);
    },
    cidade() {
      this.model.cidadeId = parseInt(this.cidade, 10);
    },
    cliente() {
      this.model = this.cliente;
    }
  },
  props: {
    cliente: {
      type: Object,
      required: true
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
      model: {
        id: 0,
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        endereco: '',
        telefone: '',
        skype: '',
        isActive: true,
        email: '',
        contato: '',
        cidadeId: 0,
        estadoId: 0
      },
      estados: [],
      cidades: [],
      modelState: {},
      cidadesEstadosModelState: [],
      estado: '',
      cidade: ''
    };
  },
  methods: {
    salvar() {
      this.modelState = {};
      this.cidadesEstadosModelState = [];
      ClienteService.saveCliente(this.model).then(() => {
        MessageService.success('Cliente cadastrado com sucesso!', 'Sucesso!');
        this.$modal.hide('edit-cliente');
      }, (error) => {
        if (error.statusText === 'Bad Request') {
          if (error.body.Estado) {
            _.forEach(error.body.Estado, (est) => {
              this.cidadesEstadosModelState.push(est);
            });
          }
          if (error.body.Cidade) {
            _.forEach(error.body.Cidade, (cid) => {
              this.cidadesEstadosModelState.push(cid);
            });
          }
          setInterval(() => {
            this.modelState = error.body;
          }, 500);
        }
      });
    },
    cancelar() {
      this.$modal.hide('edit-cliente');
    },
    atualizaModel(propName, valor) {
      if (propName === 'estado') this.estado = valor;
      else if (propName === 'cidade') this.cidade = valor;
      else this.model[propName] = valor;
    },
    loadCidades(estadoId) {
      if (estadoId <= 0) {
        return Promise.resolve();
      }

      const cidade = {
        estado: estadoId
      };

      return IBGEService.getCidades(cidade).then((response) => {
        response.data.forEach((currentCidade) => {
          this.cidades.push({
            value: `${currentCidade.id}`,
            text: currentCidade.nome
          });
        });
        return response;
      });
    },
    loadEstados() {
      return IBGEService.getEstados().then((response) => {
        response.data.forEach((currentEstado) => {
          this.estados.push({
            value: `${currentEstado.id}`,
            text: currentEstado.sigla
          });
        });
        return response;
      });
    }
  },
  computed: {
    sortedEstados() {
      return _.sortBy(this.estados, [o => o.text]);
    },
    sortedCidades() {
      return _.sortBy(this.cidades, [o => o.text]);
    }
  },
  created() {
    const loader = this.$loading.show();

    this.loadEstados().then(() => {
      this.loadCidades(this.cliente.estadoId).then(() => {
        this.model = this.cliente;
        loader.hide();
      }, () => {
        loader.hide();
      });
    }, () => {
      loader.hide();
    });
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
