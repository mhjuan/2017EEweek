const fs = require('fs');
require('babel-polyfill');
const fetch = require('isomorphic-fetch');
let words = require('./src/server/lib/words');
words = words.words;

const file = fs.createWriteStream('src/server/lib/wordData.js');
file.write('exports.data = {\n');

getData = async () => {
    for (let i = 0; i < words.length; i++) {
        // console.log(`https://www.moedict.tw/raw/${encodeURI(words[i])}`);
        await fetch(`https://www.moedict.tw/raw/${encodeURI(words[i])}`)
            // .then(this.catchStatus)
            .then(response => response.json())
            .then((data) => {
                // console.log(data.heteronyms);
                let h = data.heteronyms;
                if (typeof(h) === 'undefined' || typeof(h.length) === 'undefined') {
                    console.log(words[i]);
                    // i--;
                } else {
                    file.write(`'${words[i]}': [`);
                    for (let i = 0; i < h.length; i++) {
                        // console.log(h[i]);
                        if (typeof(h[i].bopomofo) !== 'undefined') {
                            file.write('\'');
                            file.write(h[i].bopomofo);
                            file.write('\',');
                        }
                    }
                    file.write('],\n');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    file.write('};\n');
}

getData();


