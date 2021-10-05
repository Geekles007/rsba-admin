import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const langs = ["en", "ru", "cn"];

(async () => await i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: 'ru',
            lng: 'ru',
            debug: false,
            ns: ["translation"],
            defaultNS: "translation",
            whitelist: langs,
            backend: {loadPath: `http://public-infos.s3.amazonaws.com/public/locales/{{lng}}/{{ns}}.json`},
            react: {
                useSuspense: false,
            }
        })
)();


export default i18n;
