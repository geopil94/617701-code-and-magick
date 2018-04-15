'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Константы
var CloudCoords = {
  x: [100, 310, 520, 500, 520, 310, 100, 120],
  y: [10, 15, 10, 145, 280, 275, 280, 145]
}
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
  ctx.moveTo(CloudCoords.x[0] + GAP, CloudCoords.y[0] + GAP);
  for (var i = 1; i < CloudCoords.x.length; i++) {
      ctx.lineTo(CloudCoords.x[i] + GAP, CloudCoords.y[i] + GAP);
    }
  ctx.lineTo(CloudCoords.x[0] + GAP, CloudCoords.y[0] + GAP);
  ctx.closePath();
  ctx.fill();

  // основная область с результатами 420px X 270px
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(CloudCoords.x[0], CloudCoords.y[0]);
  for (var i = 1; i < CloudCoords.x.length; i++) {
    ctx.lineTo(CloudCoords.x[i], CloudCoords.y[i]);
  }
  ctx.lineTo(CloudCoords.x[0], CloudCoords.y[0]);
  ctx.closePath();
  ctx.fill();

  var drawText = function (text, x, y, color, font) {
    var defaultColor = color || '#000000';
    var defaultFont = font || '16px PT Mono';
    ctx.fillStyle = defaultColor;
    ctx.font = defaultFont;
    ctx.fillText(text, x, y);
  };

  drawText('Ура! Вы победили!', HEADER_TEXT_X, HEADER_TEXT_Y);
  drawText('Список результатов:', HEADER_TEXT_X, HEADER_TEXT_Y + TEXT_HEIGHT + GAP / 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++){
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random().toFixed(2) + ')';
    }
    ctx.fillRect(CloudCoords.x[0] + (GAP + TEXT_WIDTH) * (i + 1), BAR_POS_Y, BAR_WIDTH, - BAR_MAX_HEIGHT * times[i] / maxTime );
    drawText(players[i], CloudCoords.x[0] + (GAP + TEXT_WIDTH) * (i + 1), PLAYER_NAME_POS_Y);
    drawText(Math.round(times[i]), CloudCoords.x[0] + (GAP + TEXT_WIDTH) * (i + 1), BAR_POS_Y - BAR_MAX_HEIGHT * times[i] / maxTime - GAP / 2);
  }
};



