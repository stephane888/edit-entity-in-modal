<!-- Ce fichier permet de gerer tous edition de cntenu quii doit se faire via un model. -->
<template>
  <b-modal
    id="b-modal-manage-project"
    v-model="openModel"
    title="BootstrapVue"
    size="lg"
    footer-bg-variant="light"
    header-bg-variant="light"
    body-class="edit-entity-in-modal"
    :hide-footer="false"
    :no-close-on-backdrop="false"
    @ok="handleOk"
  >
    <template #modal-header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <formEdit ref="formEdit" />
    </template>
    <!-- <template #modal-footer="{ cancel }">
      <b-button size="md" variant="success" @click="handleOk">
        J'ai compris
      </b-button>
      <b-button
        class="d-none"
        size="md"
        variant="outline-warning"
        @click="cancel()"
      >
        Annuler
      </b-button>
    </template> -->
    <template #modal-footer="{ cancel }">
      <b-button size="md" variant="info" @click="handleOk">
        <b-icon icon="save2" variant="white"></b-icon>
        Enregister
      </b-button>
      <b-button size="md" variant="outline-secondary" @click="cancel()">
        Annuler
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import formEdit from "./FormuLaire.vue";
export default {
  components: {
    formEdit,
  },
  props: {
    manageModal: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    openModel: {
      get() {
        if (this.manageModal) return true;
        return false;
      },
      set(value) {
        this.$emit("closeModal", value);
      },
    },
  },
  methods: {
    handleOk(event) {
      event.preventDefault();
      // alert("F2");
      this.$refs.formEdit
        .submit()
        .then(() => {
          this.$bvModal.hide("b-modal-manage-project");
          window.location.assign(window.location.pathname);
        })
        .catch((er) => {
          // On doit afficher sur le modal.
          console.log("error : ", er);
        });
    },
  },
};
</script>
<style lang="scss">
.edit-entity-in-modal {
  form {
    .form-group {
      legend {
        font-weight: 600;
      }
    }
  }
}
</style>
