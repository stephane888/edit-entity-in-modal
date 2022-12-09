import Vue from "vue";
import Vuex from "vuex";
import request from "../request";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Contient l'entite qui est encours d'edition.
     */
    currentEntityInfo: {},
    /**
     * Contient les données du formulaires.
     */
    currentEntityForm: {},

    //
    running: false,
    //
    user: {},
  },
  getters: {},
  mutations: {
    SET_CURRENT_ENTITY_INFO(state, payload) {
      state.currentEntityInfo = payload;
    },
    SET_CURRENT_ENTITY_FORM(state, payload) {
      state.currentEntityForm = payload;
    },
    ACTIVE_RUNNING(state) {
      state.running = true;
    },
    DISABLE_RUNNING(state) {
      state.running = false;
    },
    SET_VALUE(state, payload) {
      if (payload.fieldName && payload.value && state.currentEntityForm.model) {
        if (state.currentEntityForm.model[payload.fieldName]) {
          state.currentEntityForm.model[payload.fieldName] = payload.value;
        }
      }
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    set_currentEntityForm({ commit }, payload) {
      commit("SET_CURRENT_ENTITY_INFO", payload);
    },
    loadForm({ commit, state }) {
      commit("ACTIVE_RUNNING");
      const param = {
        id: state.currentEntityInfo.id,
        entity_type_id: state.currentEntityInfo.entityTypeId,
        duplicate: false,
      };
      return request
        .bPost("/vuejs-entity/form/get-form/from/entity-id", param, {}, false)
        .then((resp) => {
          commit("DISABLE_RUNNING");
          commit("SET_CURRENT_ENTITY_FORM", resp.data);
        });
    },
    saveEntity({ commit, state }) {
      return new Promise((resolv, reject) => {
        commit("ACTIVE_RUNNING");
        request
          .bPost(
            "/formatage-models/save-entity/" +
              state.currentEntityInfo.entityTypeId,
            state.currentEntityForm.model
          )
          .then((resp) => {
            commit("DISABLE_RUNNING");
            resolv(resp);
          })
          .catch((er) => {
            commit("DISABLE_RUNNING");
            reject(er);
          });
      });
    },
    cleanDatas({ commit }) {
      commit("SET_CURRENT_ENTITY_INFO", {});
      commit("SET_CURRENT_ENTITY_FORM", {});
    },
    // Permet de mettre à jour un champs ...
    setValue({ commit }, payload) {
      commit("SET_VALUE", payload);
    },
  },
  modules: {},
});
