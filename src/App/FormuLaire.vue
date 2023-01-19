<template>
  <div>
    <b-form v-if="show" @submit.prevent="onSubmit" @reset="onReset">
      <component
        :is="container.template"
        v-for="(container, i) in buildFields()"
        :key="i"
        :entity="container.entity"
        :class-entity="['pt-1']"
      >
        <component
          :is="render.template"
          v-for="(render, k) in container.fields"
          :key="k"
          :field="render.field"
          :model="render.model"
          :entities="render.entities"
          :class-css="['mb-5']"
          :parent-name="i + '.entity.'"
          :parent-child-name="i + '.entities.'"
          namespace-store=""
          @addNewValue="addNewValue($event, render)"
          @removeField="removeField($event, render)"
          @array_move="array_move($event, render)"
        ></component>
      </component>
    </b-form>
  </div>
</template>

<script>
import request from "../request";
import { mapState } from "vuex";
import generateField from "components_h_vuejs/src/js/FormUttilities";
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
      currentEntityForm: (state) => state.currentEntityForm,
    }),
    idEntity() {
      if (this.form.label !== "") {
        var id = request.generateIdEntityType(this.form.label);
        this.setId(id);
        return id;
      } else return "";
    },
  },

  methods: {
    /**
     * @private
     * @param {*} event
     */
    onSubmit(event) {
      this.submit();
    },
    /**
     * @public
     */
    submit() {
      return this.$store.dispatch("saveEntities");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      // ...
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setId(id) {
      // Si l'uuid n'existe pas, alors c'est une creation de type, on peut generer l'id.
      if (!this.form.uuid) this.form.id = id;
    },
    buildFields() {
      var fields = [];
      loadField.setConfig(request);
      console.log(" this.currentEntityForm  :", this.currentEntityForm);
      if (this.currentEntityForm.length) {
        fields = generateField.generateFields(this.currentEntityForm, fields);
      }
      return fields;
    },
    addNewValue(value, render) {
      this.model[render.field.name].push(value);
    },
    removeField(index, render) {
      this.model[render.field.name].splice(index, 1);
    },
    array_move(evt, render) {
      const moveItem = (arr, fromIndex, toIndex) => {
        let itemRemoved = arr.splice(fromIndex, 1); // assign the removed item as an array
        arr.splice(toIndex, 0, itemRemoved[0]); // insert itemRemoved into the target index
        return arr;
      };
      const vals = moveItem(
        this.model[render.field.name],
        evt.oldIndex,
        evt.newIndex
      );
      this.$store.dispatch("setValue", {
        value: vals,
        fieldName: render.field.name,
      });
    },
  },
};
</script>
