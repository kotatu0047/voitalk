// import {tokenize} from "kuromojin";
const tokenize = require('kuromojin');
const fs = require('fs');
const consts = require('./consts.js');

/*
辞書クラス...という名のファイル入出力インターフェース
json形式で学習したものを辞書データとして保存する
*/
class Dictionary {
    constructor() {
        this.dic = null;
        this.starts = null;
    }

    /*
    jsonから読み込み
     */
    Load() {
        //jsonから辞書の読み込み
        //ファイル存在チェック
        try {
            fs.accessSync(consts.DICTIONARY_FILENAME, fs.constants.R_OK | fs.constants.W_OK);
            this.dic = JSON.parse(fs.readFileSync(consts.DICTIONARY_FILENAME, 'utf-8'));
            console.log('辞書を読み込みました');
        } catch (err) {
            console.error('辞書にアクセスできないか辞書が存在しません:' + err.toString());
        }
        try {
            fs.accessSync(consts.START_WORDS_DICTIONARY_FILENAME, fs.constants.R_OK | fs.constants.W_OK);
            this.starts = JSON.parse(fs.readFileSync(consts.START_WORDS_DICTIONARY_FILENAME, 'utf-8'));
            console.log('スタート辞書を読み込みました');
        } catch (err) {
            console.error('スタート辞書にアクセスできないか辞書が存在しません:' + err.toString());
        }
    }

    /*
     jsonへ保存
      */
    Save() {
        //ファイル存在チェック
        try {
        //    fs.accessSync(consts.DICTIONARY_FILENAME, fs.constants.R_OK | fs.constants.W_OK);
            fs.writeFileSync(consts.DICTIONARY_FILENAME, JSON.stringify(this.dic));
            console.log('辞書を保存しました');
        } catch (err) {
            console.error('辞書の保存に失敗しました:' + err.toString());
        }
        try {
          //  fs.accessSync(consts.START_WORDS_DICTIONARY_FILENAME, fs.constants.R_OK | fs.constants.W_OK);
            fs.writeFileSync(consts.START_WORDS_DICTIONARY_FILENAME, JSON.stringify(this.starts));
            console.log('スタート辞書を保存しました');
        } catch (err) {
            console.error('スタート辞書の保存に失敗しました:' + err.toString());
        }
    }

}

module.exports = Dictionary;