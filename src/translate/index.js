'use strict';

// eslint-disable-next-line
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
    const response = await fetch(`${process.env.TRANSLATOR_API}/?content=${postData.content}`);
    const data = await response.json();
    return [data.is_english, data.translated_content];
};
