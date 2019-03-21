const consts = require('./consts');
const colors = require('colors');
const execSync = require('child_process').execSync;

function Talk(person, text) {
    let cid = '';
    switch (person) {
        case consts.AKANE:
            cid = consts.AKANE_CID;
            person = person.red;
            break;
        case consts.AOI:
            cid = consts.AOI_CID;
            person = person.blue;
            break;
        default:
            return;
    }

    console.log(`${person}「${text}」`)
    execSync(`SeikaSay.exe -cid ${cid} -t "${text}"`);
}

exports.Talk = Talk;
