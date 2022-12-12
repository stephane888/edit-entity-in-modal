<template>
  <div>
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <component
        :is="render.template"
        v-for="(render, k) in buildFields()"
        :key="k"
        :field="render.field"
        :model="render.model"
        :class-css="['mb-5']"
        namespace-store=""
        @addNewValue="addNewValue($event, render)"
        @removeField="removeField($event, render)"
      ></component>
    </b-form>
  </div>
</template>

<script>
import request from "../request";
import { mapState } from "vuex";
import loadField from "components_h_vuejs/src/components/fieldsDrupal/loadField";
export default {
  props: {
    showSubmit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.currentEntityForm.form,
      model: (state) => state.currentEntityForm.model,
    }),
    idEntity() {
      if (this.form.label !== "") {
        var id = request.generateIdEntityType(this.form.label);
        this.setId(id);
        return id;
      } else return "";
    },
  },
  mounted() {
    loadField.getConfig(request);
  },
  methods: {
    /**
     * @private
     * @param {*} event
     */
    onSubmit(event) {
      event.preventDefault();
      this.submit();
    },
    /**
     * @public
     */
    submit() {
      return this.$store.dispatch("saveEntity");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.id = "";
      this.form.label = "";
      this.form.description = "";
      this.form.users = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setId(id) {
      // Si l'uuid n'existe, alors c'est une creation de type, on peut generer l'id.
      if (!this.form.uuid) this.form.id = id;
    },
    buildFields() {
      const fields = [];
      for (const i in this.form) {
        fields.push({
          template: loadField.getField(this.form[i]),
          field: this.form[i],
          model: this.model,
        });
      }
      return fields;
    },
    addNewValue(value, render) {
      this.model[render.field.name].push(value);
    },
    removeField(index, render) {
      this.model[render.field.name].splice(index, 1);
    },
  },
};
</script>
