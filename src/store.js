/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import appsMetadataPlugin from 'aepp-base/src/store/plugins/ui/appsMetadata';
import languagesPlugin from 'aepp-base/src/store/plugins/ui/languages';
import { PROTOCOL_DEFAULT } from 'aepp-base/src/lib/constants';

Vue.use(Vuex);

const IS_IFRAME = window.parent !== window;

export default new Vuex.Store({
  plugins: [
    appsMetadataPlugin,
    languagesPlugin,
  ],
  getters: {
    getUrlSet: () => (path) => {
      const url = `${PROTOCOL_DEFAULT}//${path}`;
      return {
        url: IS_IFRAME ? undefined : url,
        navigateTo: () => {
          if (!IS_IFRAME) return;
          window.location.href = url;
        },
      };
    },
    pathToApp: (context, getters) => (path) => ({
      ...getters['appsMetadata/get'](path),
      path,
      ...getters.getUrlSet(path),
    }),
  },
});
