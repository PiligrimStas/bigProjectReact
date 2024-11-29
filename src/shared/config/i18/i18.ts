import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// пакет нужен что бы мы могли подгружать файлы с переводами асинхронными чанками вместо того что бы тянуть их в сборку
import Backend from 'i18next-http-backend';
// пакет нужен для сохранения переводов в local storage
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'en',
        debug: !!__IS_DEV__, // __IS_DEV__ это глобальная переменная созданная в webpack.DefinePlugin
        // debug: false, // на случай если нужно отключить вывод происходящего с i18 в консоль

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
