<template>
  <div>
    <h3>Cadastro de Campanhas</h3>
    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-primary btn-block"
                @click="novaCampanha">Nova campanha</button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-secondary btn-block"
                @click="atualizaCidadesEstados">Atualiza Cidades e
          Estados</button>
      </div>
    </div>
  </div>
</template>

<script>
import IBGEService from '@/services/ibge-service';

export default {
  data() {
    return {};
  },
  methods: {
    novaCampanha() {
      this.$router.push('/campanha');
    },
    atualizaCidadesEstados() {
      IBGEService.atualizaCidadesEstados().then(
        (resp) => {
          console.log(resp);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
};
</script>
