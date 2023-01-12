import Vue from "vue";
import Vuex from "vuex";
import request from "../request";
import generateField from "components_h_vuejs/src/js/FormUttilities";
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
    // https://stackoverflow.com/questions/64635384/write-data-to-a-nested-dictionary-given-a-key-path-of-unknown-length/64641327#64641327.
    // https://stackoverflow.com/questions/66236245/multi-level-dynamic-key-setting.
    // https://lodash.com/docs/4.17.15#update
    // il faudra faire un tuto
    SET_VALUE(state, payload) {
      console.log(" SET_VALUE payload ", payload);
      function updateSettings(settings, keyPath, value) {
        const keys = keyPath.split(".");
        const targetKey = keys.pop();
        let current = settings;
        for (let i = 0; i < keys.length; ++i) {
          current = current[keys[i]];
          if (!current) {
            throw new Error("Specified key not found. " + keys[i]);
          }
        }
        current[targetKey] = value;
      }
      updateSettings(state.currentEntityForm, payload.fieldName, payload.value);
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
    saveEntities({ commit, state }) {
      return new Promise((resolv, reject) => {
        commit("ACTIVE_RUNNING");
        generateField
          .getNumberEntities(state.currentEntityForm)
          .then((numbers) => {
            var vals = {
              numbers: numbers,
              creates: 0,
              page: "",
            };
            generateField
              .prepareSaveEntities(this, state.currentEntityForm, vals)
              .then((resp) => {
                commit("DISABLE_RUNNING");
                resolv(resp);
              })
              .catch((er) => {
                commit("DISABLE_RUNNING");
                reject(er);
              });
            //resolv(vals);
          })
          .catch((er) => {
            commit("DISABLE_RUNNING");
            reject(er);
          });
      });
    },
    saveEntity02({ commit }, payload) {
      return new Promise((resolv, reject) => {
        commit("ACTIVE_RUNNING");
        if (payload.entity_type_id == undefined || !payload.entity_type_id) {
          reject("Paramettre manquant");
        } else
          request
            .bPost(
              "/formatage-models/save-entity/" + payload.entity_type_id,
              payload.value
            )
            .then((resp) => {
              console.log("resp : ", resp);
              // setTimeout(() => {
              console.log(" payload : ", payload);
              resolv(resp);
              // }, 1000);
            })
            .catch((er) => {
              reject(er);
            });
      });
    },
    saveEntity({ commit }, payload) {
      return new Promise((resolv, reject) => {
        commit("ACTIVE_RUNNING");
        if (payload.entity_type_id == undefined || !payload.entity_type_id) {
          reject("Paramettre manquant");
        } else
          request
            .bPost(
              "/apivuejs/save-entity/" + payload.entity_type_id,
              payload.value
            )
            .then((resp) => {
              console.log("resp : ", resp);
              // setTimeout(() => {
              console.log(" payload : ", payload);
              resolv(resp);
              // }, 1000);
            })
            .catch((er) => {
              reject(er);
            });
      });
    },
    saveEntityOLD({ commit, state }) {
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
