'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// расположение точек облака
//1-\2/-3
// 8   4
//7-/6\-5

//Константы
// CLOUD_POINT = CP - координаты точек облака
var CP_X1 = 100;
var CP_Y1 = 10;
var CP_X2 = 310;
var CP_Y2 = 15;
var CP_X3 = 520;
var CP_Y3 = 10;
var CP_X4 = 500;
var CP_Y4 = 145;
var CP_X5 = 520;
var CP_Y5 = 280;
var CP_X6 = 310;
var CP_Y6 = 275;
var CP_X7 = 100;
var CP_Y7 = 280;
var CP_X8 = 120;
var CP_Y8 = 145;
var GAP = 10;
var TEXT_WIDTH = 65;
var TEXT_HEIGHT = 16;
var PLAYER_NAME_POS_Y = 265;
var BAR_WIDTH =  40;
var BAR_MAX_HEIGHT = 150;
var BAR_POS_Y = 250;
var HEADER_TEXT_X = 150;
var HEADER_TEXT_Y = 50;

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  // тень области с результатами
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(CP_X1 + GAP, CP_Y1 + GAP);
  ctx.lineTo(CP_X2 + GAP, CP_Y2 + GAP);
  ctx.lineTo(CP_X3 + GAP, CP_Y3 + GAP);
  ctx.lineTo(CP_X4 + GAP, CP_Y4);
  ctx.lineTo(CP_X5 + GAP, CP_Y5 + GAP);
  ctx.lineTo(CP_X6, CP_Y6 + GAP);
  ctx.lineTo(CP_X7 + GAP, CP_Y7 + GAP);
  ctx.lineTo(CP_X8 + GAP, CP_Y8 + GAP);
  ctx.lineTo(CP_X1 + GAP, CP_Y1 + GAP);
  ctx.closePath();
  ctx.fill();

  // основная область с результатами 420px X 270px
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(CP_X1, CP_Y1);
  ctx.lineTo(CP_X2, CP_Y2);
  ctx.lineTo(CP_X3, CP_Y3);
  ctx.lineTo(CP_X4, CP_Y4);
  ctx.lineTo(CP_X5, CP_Y5);
  ctx.lineTo(CP_X6, CP_Y6);
  ctx.lineTo(CP_X7, CP_Y7);
  ctx.lineTo(CP_X8, CP_Y8);
  ctx.lineTo(CP_X1, CP_Y1);
  ctx.closePath();
  ctx.fill();

  // меняем цвет заливки на чёрный, чтобы было видно текст
   ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', HEADER_TEXT_X, HEADER_TEXT_Y);
  ctx.fillText('Список результатов:', HEADER_TEXT_X, HEADER_TEXT_Y + TEXT_HEIGHT + GAP / 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++){
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      // ВОПРОС! Почему мы где-то задаём цвета через RGBA а где-то через WEBSAFE, должно быть единообразие? Это не отразится на невыполнении критериев?
    }
    else {
      /*var R = Math.floor(Math.random()*255);
      var G = Math.floor(Math.random()*255);
      ctx.fillStyle = 'rgba(Number(R), Number(G), 255, 1)';*/

      /*  var R = parceInt(Math.floor(Math.random()*255), 16);
      var G = parceInt(Math.floor(Math.random()*255),16)
      var B = parceInt(255, 16);
      ctx.fillStyle = '#' + 'R' + 'G' + 'B';*/
      ctx.fillStyle = '#000'; // Так я и не смог придумать как сделать случайную насыщенность у цвета =(
    }
    ctx.fillRect(CP_X1 + (GAP + TEXT_WIDTH) * (i + 1), BAR_POS_Y, BAR_WIDTH, - BAR_MAX_HEIGHT * times[i] / maxTime );
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CP_X1 + (GAP + TEXT_WIDTH) * (i + 1), PLAYER_NAME_POS_Y);
    ctx.fillText(Math.round(times[i]), CP_X1 + (GAP + TEXT_WIDTH) * (i + 1), BAR_POS_Y - BAR_MAX_HEIGHT * times[i] / maxTime - GAP / 2);
  }
};


