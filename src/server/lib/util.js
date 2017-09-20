/* jslint node: true */

'use strict';

var cfg = require('../../../config.json');

exports.validNick = function(nickname) {
    var regex = /^\w*$/;
    return regex.exec(nickname) !== null;
};

// determine mass from radius of circle
exports.massToRadius = function (mass) {
    return 4 + Math.sqrt(mass) * 6;
};


// overwrite Math.log function
exports.log = (function () {
    var log = Math.log;
    return function (n, base) {
        return log(n) / (base ? log(base) : 1);
    };
})();

// get the Euclidean distance between the edges of two shapes
exports.getDistance = function (p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) - p1.radius - p2.radius;
};

exports.randomInRange = function (from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
};

// generate a random position within the field of play
exports.randomPosition = function (radius) {
    return {
        x: exports.randomInRange(radius, cfg.gameWidth - radius),
        y: exports.randomInRange(radius, cfg.gameHeight - radius)
    };
};

exports.uniformPosition = function(points, radius) {
    var bestCandidate, maxDistance = 0;
    var numberOfCandidates = 10;

    if (points.length === 0) {
        return exports.randomPosition(radius);
    }

    // Generate the candidates
    for (var ci = 0; ci < numberOfCandidates; ci++) {
        var minDistance = Infinity;
        var candidate = exports.randomPosition(radius);
        candidate.radius = radius;

        for (var pi = 0; pi < points.length; pi++) {
            var distance = exports.getDistance(candidate, points[pi]);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        if (minDistance > maxDistance) {
            bestCandidate = candidate;
            maxDistance = minDistance;
        } else {
            return exports.randomPosition(radius);
        }
    }

    return bestCandidate;
};

exports.findIndex = function(arr, id) {
    var len = arr.length;

    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }

    return -1;
};

exports.randomColor = function() {
    var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    var r = (parseInt(c[1], 16) - 32) > 0 ? (parseInt(c[1], 16) - 32) : 0;
    var g = (parseInt(c[2], 16) - 32) > 0 ? (parseInt(c[2], 16) - 32) : 0;
    var b = (parseInt(c[3], 16) - 32) > 0 ? (parseInt(c[3], 16) - 32) : 0;

    return {
        fill: color,
        border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    };
};

var words = `啊愛安把八吧爸百白半辦幫包報被備北本比必筆邊變表別病不步才參\
常長唱車成城吃出盧除楚穿船窗床春詞次從錯大打答帶代但單當到倒\
道的得地等第低底弟點電店掉定丟動東懂冬都讀度短對多二而兒耳發\
法反飯方放房非費飛分風父夫服該改干感趕剛高告搞個各歌哥給跟根\
更工公共功夠故古怪關管館慣廣光貴國過果還海孩漢好號和河喝黑很\
紅後候乎互忽話化畫花壞歡黃會回活或火機幾級極寄即既記己急家加\
價假件見閒簡將講交教叫較接節解結界街借金進緊今近盡經京淨就九\
究舊九句據舉決覺開看考靠課可科寄刻肯空口苦哭快塊況虧困拉來老\
了纍裏理力利立離歷連聯臉練兩量輛涼另零六流留樓路旅綠亂論落嗎\
馬罵媽麻買賣慢滿忙毛貌每沒美妹們門米面民名明命么母木那拿哪奶\
難南男鬧呢內能年念娘您你農弄女怕旁胖跑朋皮片票平破普起期氣汽\
七奇騎齊前錢淺千強且親請青輕慶窮球求秋去區取趣全卻確然讓熱人\
認日容肉如入三色山商上少社舍深身甚神生省聲剩時十是識師市使事\
試食室石視始世史詩收受手書數舒熟樹水睡誰說四思死似送訴算歲雖\
隨孫他她它太臺談討逃特疼體提題替天條挑跳聽停同通頭圖土外王完\
玩萬晚望忘為位文問聞我五無物午屋舞系西息希席喜下夏現先線想向\
像相小校笑寫些謝新信心行性形星興姓修休需須許學雪血牙呀言研嚴\
眼演樣要藥也業頁爺液一以椅已義易醫衣因音應英影迎用有又由游右\
友于與語魚雨元原園遠願月越在再早怎字子自站章張這者真正政只知\
直至紙中種終重周主佐助專准桌總走足最作做坐座昨左著\
板班般畢遍標兵冰部彩菜草厠此茶產廠場超朝稱川傳吹聰粗達擔刀\
德燈敵帝典段斷隊惡豐福富佛敢鋼狗姑挂骨抓官觀哈害寒汗合何狠恨\
橫呼湖胡虎華滑皇計際基技建健獎腳角精靜驚睛酒救軍康藍勞類雷淚\
列領令林龍帽夢秘密迷墨腦鳥牛暖爬牌排盤批篇評鉛槍牆橋巧瞧切情\
清晴任仍軟弱賽森傻殺勝式叔術暑摔松酸糖甜田鐵庭統偷突團退腿灣\
危圍溫穩握務洗細戲悉嚇鮮險響鞋選壓亞烟陽陰銀硬泳永優油育員院\
圓咱造仔資占戰針爭整支枝祝轉裝週`;

exports.randomWord = function() {
    return words[Math.floor(Math.random() * words.length)];
};