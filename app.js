//エントリーポイント
const voiceroid = require('./voiceroid');
const Eliza = require('./eliza');
const consts = require('./consts');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

const eliza = new Eliza();
process.stdout.write('>');

reader.on('line', input => {
    if (!input) return;
    input = input.trim();

    eliza.StudyAndResponse(input)
        .then(response => {
            voiceroid.Talk(consts.AOI, response);
            process.stdout.write('>');
            return eliza.StudyAndResponse(response);
        })
        .then(response => {
            voiceroid.Talk(consts.AKANE, response);
            process.stdout.write('>');
            return eliza.StudyAndResponse(response);
        })
        .then(response => {
            voiceroid.Talk(consts.AOI, response);
            process.stdout.write('>');
            return eliza.StudyAndResponse(response);
        })
        .then(response => {
            voiceroid.Talk(consts.AKANE, response);
            process.stdout.write('>');
            return eliza.StudyAndResponse(response);
        })
        .then(response => {
            voiceroid.Talk(consts.AOI, response);
            process.stdout.write('>');
            return eliza.StudyAndResponse(response);
        })
        .then(response => {
            voiceroid.Talk(consts.AKANE, response);
            process.stdout.write('>');
        });
});

reader.on('close', () => {
    eliza.Save();
    console.log('会話を終了します')
});