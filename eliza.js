const Dictionary = require('./dictionary');
const Markov = require('./markov');
const kuromojin = require('kuromojin');
const utilty = require('./utilty');

/*
人口無能コアクラス
*/
class Eliza {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.Load();
        this.markov = new Markov(this.dictionary)
    }

    /*
    ユーザーからの入力を受け取り学習と返答を行う
     */
    async StudyAndResponse(input, callback) {
        if (!input) return callback('会話する気あるの?');

        const parts = await kuromojin.tokenize(input);
        //学習
        this.markov.AddSentence(parts);

        //会話文生成
        const re = /名詞|動詞|一般|代名詞|固有名詞|サ変接続|形容動詞語幹|感動詞/;
        const keywords = parts.filter(part => {
            return re.test(part['pos']);
        });

        const keyword = (keywords.length >= 1) ? utilty.randomChoiceFromArray(keywords) : '';
        return (keyword) ? this.markov.GenerateResponse(keyword['surface_form']) : '応答分の生成に失敗しました';
    }

    /*
    保存メソッドを叩くだけ
     */
    Save() {
        this.dictionary.dic = this.markov.dic;
        this.dictionary.starts = this.markov.starts;
        this.dictionary.Save();
    }
}

module.exports = Eliza;