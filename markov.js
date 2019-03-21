const consts = require('./consts.js');
const utilty = require('./utilty.js');

const initialDic = {
    'あたし': {
        'は': ['琴葉茜', '琴葉葵']
    },
    'は': {
        '琴葉茜': ['です'],
        '琴葉葵': ['です']
    },
    '琴葉茜': {
        'です': [consts.END_MARK]
    },
    '琴葉葵': {
        'です': [consts.END_MARK]
    }
};

const initialStarts = {
    'あたし': 1
};


/*
マルコフ連鎖実装クラス
*/
class Markov {
    constructor(dictionary) {
        if (dictionary) {
            this.dic = dictionary.dic || initialDic;
            this.starts = dictionary.starts || initialStarts;
        } else {
            this.dic = initialDic;
            this.starts = initialStarts;
        }
    }

    /*
    形態素解析結果から学習行う
    */
    AddSentence(parts) {
        //3単語以下の文章は学習しない
        if (parts.length <= 3) return;

        // 引数の参照元をコピー
        let partsCopy = [...parts];

        //prefix1, prefix2 には文章の先頭の2単語が入る
        let prefix1 = partsCopy[0]['surface_form'];
        let prefix2 = partsCopy[1]['surface_form'];

        // 文章の開始点を記録する
        // 文章生成時に「どの単語から文章を作るか」の参考にするため
        this.__AddStart(prefix1);

        partsCopy = partsCopy.slice(2);
        for (let i = 0; i < partsCopy.length; i++) {
            let suffix = partsCopy[i]['surface_form'];
            this.__AddSuffix(prefix1, prefix2, suffix);
            prefix1 = prefix2;
            prefix2 = suffix;
        }
        this.__AddSuffix(prefix1, prefix2, consts.END_MARK);
    }

    __AddStart(startWord) {
        if (this.starts[startWord] || this.starts[startWord] === 0) {
            this.starts[startWord] += 1
        } else {
            this.starts[startWord] = 0
        }
    }

    __AddSuffix(prefix1, prefix2, suffix) {
        this.dic[prefix1] = this.dic[prefix1] || {};
        this.dic[prefix1][prefix2] = this.dic[prefix1][prefix2] || [];

        this.dic[prefix1][prefix2].push(suffix)
    }

    /*
    キーワードを元に会話文を生成
    */
    GenerateResponse(keyword) {
        if (!keyword) return '沈黙は罪だよ';
        if (!this.dic || Object.keys(this.dic).length <= 0) return '辞書が空だよ';
        if (!this.starts || Object.keys(this.starts).length <= 0) return 'スタート文字辞書が空だよ';

        //keywordをprefix1とし、そこから始まる文章を生成して返す。
        let prefix1 = '';
        if (this.dic[keyword] && Object.keys(this.dic[keyword]).length >= 1) {
            prefix1 = keyword;
        } else {
            //keywordがprefix1として登録されていない場合、スタート文字辞書からランダムに選択する
            prefix1 = utilty.randomChoiceFromArray(Object.keys(this.starts));
        }

        //ランダムにprefix2を決定する
        let prefix2 = utilty.randomChoiceFromArray(Object.keys(this.dic[prefix1]));

        const words = [prefix1, prefix2];
        // 最大CHAIN_MAX回のループを回し、単語を選択してwordsを拡張していく
        //ランダムに選択したsuffixがENDMARKであれば終了し、単語であればwordsに追加する
        //その後prefix1, prefix2をスライドさせて始めに戻る
        for (let i = 0; i < consts.CHAIN_MAX; i++) {
            let suffix = utilty.randomChoiceFromArray(this.dic[prefix1][prefix2]);
            if (suffix === consts.END_MARK) break;
            words.push(suffix);
            prefix1 = prefix2;
            prefix2 = suffix;
        }
        return words.join('');
    }
}

module.exports = Markov;