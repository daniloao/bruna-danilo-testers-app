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
      <label :for="name"><b>{{ placeholder }}</b></label>
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
      <datetime input-class="form-control"
                :name="name"
                v-model="modelMutatable"
                type="date"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime"></datetime>
    </div>
    <div v-if="isFile()">
      <b-form-file :placeholder="placeholder"
                   v-model="modelMutatable"
                   :name="name"
                   :accept="accept"></b-form-file>
    </div>
    <div v-if="isTextarea()">
      <b-form-textarea :id="name"
                       :name="name"
                       v-model="modelMutatable"
                       :placeholder="placeholder"
                       :rows="3"
                       :max-rows="6">
      </b-form-textarea>
    </div>
    <div v-if="isMultiselect()">
      <multiselect v-model="modelMutatable"
                   :options="options"
                   :placeholder="placeholder"
                   :name="name"
                   :disabled="isDisabled"
                   :close-on-select="false"
                   :clear-on-select="false"
                   :multiple="true"
                   :preserve-search="true"
                   :track-by="trackBy"
                   :group-values="groupValues"
                   :group-label="groupLabel"
                   :label="label"
                   :hide-selected="true"
                   @remove="remove"
                   :loading="loading"></multiselect>
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
import bFormFile from 'bootstrap-vue/es/components/form-file/form-file';
import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';

export default {
  components: {
    'model-select': ModelSelect,
    bFormInput,
    bAlert,
    bFormGroup,
    bFormFile,
    bFormTextarea
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: 'nome'
    },
    groupValues: {
      type: String,
      required: false,
      default: ''
    },
    groupLabel: {
      type: String,
      required: false,
      default: ''
    },
    trackBy: {
      type: String,
      required: false,
      default: 'nome'
    },
    accept: {
      type: String,
      required: false,
      default: 'image/*'
    },
    minDatetime: {
      type: String,
      required: false,
      default: null
    },
    maxDatetime: {
      type: String,
      required: false,
      default: null
    },
    index: Number,
    type: String,
    model: [String, Number, Object, Boolean, Array, File],
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
    remove(item) {
      this.$emit('remove', item);
    },
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
    isFile() {
      return this.type === 'file';
    },
    isTextarea() {
      return this.type === 'textarea';
    },
    isMultiselect() {
      return this.type === 'multiselect';
    },
    isText() {
      return !this.isSelect()
        && !this.isRadio()
        && !this.isCheckbox()
        && !this.isSuggest()
        && !this.isDatepicker()
        && !this.isFile()
        && !this.isTextarea()
        && !this.isMultiselect();
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
