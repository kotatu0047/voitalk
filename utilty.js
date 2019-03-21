/*
 オブジェクトの中からランダムに取得
 */
exports.randomChoiceFromObject = (obj) => {
    if (!obj) return null;

    const keys = Object.keys(obj);

    if (keys.length === 0) return null;

    return obj[keys[Math.floor(keys.length * Math.random())]];
};

/*
 配列の中からランダムに取得
 */
exports.randomChoiceFromArray = (arr) => {
    if (!arr || arr.length === 0) return null;

    return arr[Math.floor(arr.length * Math.random())];
};
