import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "uz"],
        debug: false,
        detection: {
            order: ["localStorage"],
            caches: ["localStorage"],
        },
        interpolation: {
            escapeValue: false
        }
    })