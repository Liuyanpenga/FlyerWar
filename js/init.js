function getDom(selector) {
  return document.querySelector(selector);
}

// 需要创建随机位置的敌机 offset 的 x 轴的区间随机数
function randomLimit(start, end) {
  return start + Math.round((end - start) * Math.random());
}
// 获取元素
var $box = getDom(".box");
var $begin = getDom(".begin");
var $game = getDom(".game");
var $score1 = getDom(".score1");
var $scoreBox = getDom(".score-box");
var $score2 = getDom(".score2");

var maxWidth = 320, maxHeight = 568;
var game
var mainPlan
var DOWN = "s", UP = "w", LEFT = "a", RIGHT = "d";
var MAIN = "mainPlan", ENEMY = "enemy", BULLET = "bullet";
var onkeypressFn
var isGameover = false
