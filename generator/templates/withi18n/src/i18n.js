import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { LOCALE, DEFAULT } from './helpers/Constants';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locale', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: DEFAULT.LOCALE,
  messages: loadLocaleMessages()
});

const changeLocaleLang = (lang) => {
  i18n.locale = lang;
};

export default {
  i18n,
  changeLocaleLang
};
