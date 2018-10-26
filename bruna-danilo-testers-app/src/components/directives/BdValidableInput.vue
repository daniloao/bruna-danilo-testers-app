<template>
  <div>
    <div v-if="isText()">
      <b-form-input :type="type"
                    v-if="mask !== ''"
                    v-mask="mask"
                    :placeholder="placeholder"
                    v-model="modelMutatable"
                    :name="name"></b-form-input>
      <b-form-input :type="type"
                    v-if="mask === ''"
                    :placeholder="placeholder"
                    v-model="modelMutatable"
                    :name="name"></b-form-input>
    </div>
    <div v-if="isSelect()">
      <model-select :options="options"
                    v-model="modelMutatable"
                    :placeholder="placeholder"
                    :name="name"
                    :isDisabled="isDisabled"></model-select>
    </div>
    <div v-if="isRadio()">
      <b-form-radio-group v-model="modelMutatable"
                          :options="options"
                          :name="name">
      </b-form-radio-group>
    </div>
    <div v-if="isCheckbox()">
      <input :type="type"
             v-model="modelMutatable"
             :name="name">
      <label :for="name">{{ placeholder }}</label>
    </div>
    <div v-if="isSuggest()">
      <vue-simple-suggest :name="name"
                          v-model="modelMutatable"
                          :list="options"
                          :filter-by-query="true"
                          :placeholder="placeholder"
                          :display-attribute="displayAtribute"
                          :value-attribute="valueAttribute"
                          @select="selectSuggest"
                          ref="suggestComponent">
      </vue-simple-suggest>
    </div>
    <div v-if="isDatepicker()">
      <datetime :name="name"
                v-model="modelMutatable"></datetime>
    </div>
    <b-alert variant="danger"
             :show="showValidadtionMessage && modesStateMessages.length > 0">
      <p class="validation-message"
         v-for="(message, key) in modesStateMessages"
         :key="key">
        {{message}}
      </p>
    </b-alert>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bAlert from 'bootstrap-vue/es/components/alert/alert';
import StringService from '@/services/string-service';

export default {
  components: {
    'model-select': ModelSelect,
    bFormInput,
    bAlert,
    bFormGroup
  },
  props: {
    index: Number,
    type: String,
    model: [String, Number, Object, Boolean, Array],
    placeholder: String,
    name: String,
    modelState: {},
    atualizaModel: Function,
    options: Array,
    isDisabled: Boolean,
    displayAtribute: {
      type: String,
      default: 'nome'
    },
    valueAttribute: {
      type: String,
      default: 'id'
    },
    showValidadtionMessage: {
      type: Boolean,
      default: true
    },
    mask: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modelMutatable: this.model,
      modelStateMutable: this.modelState
    };
  },
  methods: {
    selectSuggest(selected) {
      if (selected) {
        this.$emit('suggest-selected', selected, this.index);
      }
    },
    isSelect() {
      return this.type === 'select';
    },
    isRadio() {
      return this.type === 'radio';
    },
    isCheckbox() {
      return this.type === 'checkbox';
    },
    isSuggest() {
      return this.type === 'suggest';
    },
    isDatepicker() {
      return this.type === 'datepicker';
    },
    isText() {
      return !this.isSelect()
        && !this.isRadio()
        && !this.isCheckbox()
        && !this.isSuggest()
        && !this.isDatepicker();
    }
  },
  created() { },
  watch: {
    modelState() {
      this.modelStateMutable = this.modelState;
    },
    model() {
      this.modelMutatable = this.model;
    },
    modelMutatable() {
      this.modelStateMutable = {};
      if (this.isSuggest() && this.$refs.suggestComponent.selected) {
        return;
      }
      this.atualizaModel(this.name, this.modelMutatable, this.index);
    }
  },
  computed: {
    nameCase() {
      return StringService.firstToUpper(this.name);
    },
    modesStateMessages() {
      if (
        this.modelStateMutable
        && this.modelStateMutable[this.nameCase]
        && this.modelStateMutable[this.nameCase].length > 0
      ) {
        return this.modelStateMutable[this.nameCase];
      }

      return [];
    }
  }
};
</script>
