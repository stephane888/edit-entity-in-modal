"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkedit_entity_in_layout"] = (typeof self !== 'undefined' ? self : this)["webpackChunkedit_entity_in_layout"] || []).push([[298],{

/***/ 6298:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MultiSelectEntities; }
});

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!../components_bootstrapvuejs/src/components/Ressouces/MultiSelectEntities.vue?vue&type=template&id=6a3677d5&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ValidationProvider', {
    attrs: {
      "name": _vm.fullname,
      "rules": _vm.getRules()
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function (v) {
        return [_c('b-form-group', {
          attrs: {
            "label": _vm.field.label,
            "description": _vm.field.description
          }
        }, [_c('div', {
          staticClass: "autocomplete"
        }, [_c('multiselect', {
          attrs: {
            "options": _vm.options,
            "custom-label": _vm.nameWithLang,
            "placeholder": "",
            "label": "text",
            "track-by": "text",
            "show-no-results": true,
            "show-labels": false,
            "loading": _vm.isLoading,
            "multiple": _vm.cardinality,
            "allow-empty": true
          },
          on: {
            "search-change": _vm.asyncFind
          },
          model: {
            value: _vm.value_select,
            callback: function ($$v) {
              _vm.value_select = $$v;
            },
            expression: "value_select"
          }
        }, [_c('template', {
          slot: "noResult"
        }, [_c('span', {
          staticClass: "option__title"
        }, [_vm._v(" Aucun contenu ne correspond à votre recherche ")])]), _c('template', {
          slot: "placeholder"
        }, [_c('span', {
          staticClass: "option__title"
        }, [_vm._v(" Aucun contenu ... ")])]), _c('template', {
          slot: "noOptions"
        }, [_c('span', {
          staticClass: "option__title"
        }, [_vm._v(" Saisir un ou plusieurs caractères ... ")])])], 2), _c('div', {
          staticClass: "text-danger"
        }, _vm._l(v.errors, function (error, ii) {
          return _c('small', {
            key: ii,
            staticClass: "d-block"
          }, [_vm._v(" " + _vm._s(error) + " ")]);
        }), 0)], 1)])];
      }
    }])
  });
};
var staticRenderFns = [];

// EXTERNAL MODULE: ../components_bootstrapvuejs/node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(6352);
// EXTERNAL MODULE: ./node_modules/vee-validate/dist/vee-validate.esm.js
var vee_validate_esm = __webpack_require__(8673);
// EXTERNAL MODULE: ../components_bootstrapvuejs/node_modules/vue-multiselect/dist/vue-multiselect.min.js
var vue_multiselect_min = __webpack_require__(8627);
var vue_multiselect_min_default = /*#__PURE__*/__webpack_require__.n(vue_multiselect_min);
// EXTERNAL MODULE: ../drupal-vuejs/src/App/jsonApi/itemsEntity.js
var itemsEntity = __webpack_require__(2320);
// EXTERNAL MODULE: ../components_bootstrapvuejs/src/components/fieldsDrupal/loadField.js + 108 modules
var loadField = __webpack_require__(8496);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!../components_bootstrapvuejs/src/components/Ressouces/MultiSelectEntities.vue?vue&type=script&lang=js&





/* harmony default export */ var MultiSelectEntitiesvue_type_script_lang_js_ = ({
  name: "MultiSelectEntities",
  components: {
    ValidationProvider: vee_validate_esm/* ValidationProvider */.d_,
    Multiselect: (vue_multiselect_min_default())
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    model: {
      type: [Object, Array],
      required: true
    },
    namespaceStore: {
      type: String,
      required: true
    },
    parentName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      options: [],
      value_select: null
    };
  },
  computed: {
    fullname() {
      return this.parentName + this.field.name;
    },
    cardinality() {
      if (this.field.cardinality === -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    /**
     * L'objectif est que cette valeur soit un reflet de la valeur contenu dans l'entité.
     * @param {*} val
     */
    value_select(val) {
      if (this.cardinality) {
        const vals = [];
        val.forEach(item => {
          vals.push({
            target_id: item.value
          });
        });
        this.setValue(vals);
      } else {
        const vals = [];
        vals.push({
          target_id: val.value
        });
        this.setValue(vals);
      }
    }
  },
  mounted() {
    this.loadDefaults();
  },
  methods: {
    /**
     *
     * @param {*} tid
     */
    getTermById(tid) {
      // Doit etre dynamique.
      let entity_type_id = this.getFistVocab();
      if (entity_type_id && loadField/* default.config */.Z.config) {
        const terms = new itemsEntity/* default */.Z(entity_type_id, entity_type_id, loadField/* default.config */.Z.config);
        this.isLoading = true;
        terms.getValueById(tid).then(() => {
          const options = terms.getOptions();
          this.options = options;
          if (this.cardinality) {
            this.value_select = options;
          } else if (options[0]) this.value_select = options[0];
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    /**
     *
     */
    loadDefaults() {
      this.model[this.field.name].forEach(item => {
        this.getTermById(item.target_id);
      });
    },
    /**
     * --
     */
    getFistVocab() {
      if (this.field.definition_settings.handler_settings.target_bundles) {
        const keys = Object.keys(this.field.definition_settings.handler_settings.target_bundles);
        return this.field.definition_settings.handler_settings.target_bundles[keys[0]];
      } else if (this.field.definition_settings.target_type) {
        return this.field.definition_settings.target_type;
      } else return null;
    },
    /**
     *
     * @param {*} search
     */
    asyncFind(search) {
      if (search.length >= 2) {
        // Doit etre dynamique.
        let entity_type_id = this.getFistVocab();
        if (entity_type_id && loadField/* default.config */.Z.config) {
          const terms = new itemsEntity/* default */.Z(entity_type_id, entity_type_id, loadField/* default.config */.Z.config);
          this.isLoading = true;
          terms.getSearch(search).then(() => {
            this.options = terms.getOptions();
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
        }
      }
    },
    /**
     * cette fonction est utiliser pour mettre à jour les données dans l'entité.
     * @deprecated
     * @param {*} input
     */
    // selectUser(input) {
    //   const vals = this.model[this.field.name];
    //   vals.push({ target_id: input.value });
    //   this.setValue(vals);
    // },

    nameWithLang({
      text
    }) {
      return `${text}`;
    },
    /**
     *
     * @param {*} vals
     */
    setValue(vals) {
      if (this.namespaceStore) {
        this.$store.dispatch(this.namespaceStore + "/setValue", {
          value: vals,
          fieldName: this.fullname
        });
      } else this.$store.dispatch("setValue", {
        value: vals,
        fieldName: this.fullname
      });
    },
    /**
     *
     */
    getRules() {
      return loadField/* default.getRules */.Z.getRules(this.field);
    }
  }
});
;// CONCATENATED MODULE: ../components_bootstrapvuejs/src/components/Ressouces/MultiSelectEntities.vue?vue&type=script&lang=js&
 /* harmony default export */ var Ressouces_MultiSelectEntitiesvue_type_script_lang_js_ = (MultiSelectEntitiesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ../components_bootstrapvuejs/src/components/Ressouces/MultiSelectEntities.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  Ressouces_MultiSelectEntitiesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MultiSelectEntities = (component.exports);

/***/ }),

/***/ 2320:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5251);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4177);
/* harmony import */ var _Confs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5831);
/* harmony import */ var _buildFilter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6670);




class itemsEntity {
  constructor(entity_type_id, bundle = null, config = null) {
    this.entity_type_id = entity_type_id;
    //
    if (!bundle) {
      bundle = entity_type_id;
    }
    this.url = _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].baseURl */ .Z.baseURl + "/" + this.entity_type_id + "/" + bundle;
    this.items = [];
    // en function de l'environement on doit ajouter les paramettres de bases.( notament baseUrl, TestDomain, les methodes surchargées ).
    if (config) {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z = {
        ..._utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
        ...config
      };
    }
  }
  /**
   * Recupere les items
   */
  get() {
    return new Promise(resolv => {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dGet */ .Z.dGet(this.url, _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].headers */ .Z.headers).then(resp => {
        this.items = resp.data;
        resolv(resp.data);
      });
    });
  }
  /**
   * Recupere les items
   */
  getSearch(search) {
    const filter = new _buildFilter_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
    filter.addFilter("name", "CONTAINS", search);
    return new Promise(resolv => {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dGet */ .Z.dGet(this.url + "?" + filter.query, _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].headers */ .Z.headers).then(resp => {
        this.items = resp.data;
        resolv(resp.data);
      });
    });
  }
  /**
   *
   * @returns *
   */
  getValue(term) {
    const filter = new _buildFilter_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
    filter.addFilter("name", "=", term);
    return new Promise(resolv => {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dGet */ .Z.dGet(this.url + "?" + filter.query, _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].headers */ .Z.headers).then(resp => {
        this.items = resp.data;
        resolv(resp.data);
      });
    });
  }
  /**
   *
   * @returns *
   */
  getValueByTid(id) {
    const filter = new _buildFilter_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
    filter.addFilter("tid", "=", id);
    return new Promise((resolv, reject) => {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dGet */ .Z.dGet(this.url + "?" + filter.query, _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].headers */ .Z.headers).then(resp => {
        this.items = resp.data;
        resolv(resp.data);
      }).catch(er => {
        reject(er);
      });
    });
  }

  /**
   *
   * @returns *
   */
  getValueById(id) {
    const filter = new _buildFilter_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
    let fieldId = "id";
    switch (this.entity_type_id) {
      case "user":
        fieldId = "uid";
        break;
      case "domain":
        fieldId = "drupal_internal__id";
        break;
    }
    filter.addFilter(fieldId, "=", id);
    return new Promise(resolv => {
      _utilities_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].get */ .Z.get(this.url + "?" + filter.query, _Confs_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].headers */ .Z.headers).then(resp => {
        this.items = resp.data;
        resolv(resp.data);
      });
    });
  }
  /**
   * Retourne les termes sous formes de liste d'otpions.
   */
  getOptions() {
    const options = [];
    for (const i in this.items.data) {
      const term = this.items.data[i];
      if (this.entity_type_id == "user") {
        options.push({
          text: term.attributes.name,
          value: term.attributes.drupal_internal__uid
        });
      } else if (term.attributes.name) {
        options.push({
          text: term.attributes.name,
          value: term.attributes.drupal_internal__id
        });
      } else if (term.attributes.label) {
        options.push({
          text: term.attributes.label,
          value: term.attributes.drupal_internal__id
        });
      }
    }
    return options;
  }
}
/* harmony default export */ __webpack_exports__["Z"] = (itemsEntity);

/***/ })

}]);
//# sourceMappingURL=EditEntity.common.298.js.map