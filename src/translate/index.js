'use strict';

// eslint-disable-next-line
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
    console.log($os.getenv("TRANSLATOR_API"))
    const response = await fetch(`https://wildcatstranslator-bdjk25ls4q-uc.a.run.app/?content=${postData.content}`);
    const data = await response.json();
    return [data.is_english, data.translated_content];
};
