'use strict';

var PADDLE_H = 10;
var PADDLE_W = 75;

var canvas, ctx, h, w;
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;

var bricks;
var N_ROWS;
var N_COLS;
var BRICK_WIDTH;
var BRICK_HEIGHT;
var PADDING;

$(document).ready(function() {
                    
    canvas = document.getElementById('display');
    ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;

    function Game() {
        this.DrawInterval = 10;

        this.rightDown = false;
        this.leftDown = false;

        this.paddlex = w / 2;
        this.paddleh = PADDLE_H;
        this.paddlew = PADDLE_W;

        this.Initialize();
    }

    Game.prototype.onkeyup_ = function(e) {
        if (e.keyCode == 39) this.rightDown = false;
        else if (e.keyCode == 37) this.leftDown = false;
    };

    Game.prototype.onkeydown_ = function(e) {
        if (e.keyCode == 39) this.rightDown = true;
        else if (e.keyCode == 37) this.leftDown = true;
    };

    Game.prototype.initBricks_ = function() {
        N_ROWS = 5;
        N_COLS = 5;
        BRICK_WIDTH = (w/N_COLS) - 1;
        BRICK_HEIGHT = 15;
        PADDING = 1;

        bricks = new Array(N_ROWS);
        for (var i = 0; i < N_ROWS; i++) {
            bricks[i] = new Array(N_COLS);
            for (var j = 0; j < N_COLS; j++) {
                bricks[i][j] = 1;
            }
        }
    };

    Game.prototype.drawCircle_ = function(x,y,r) {
        ctx.beginPath();
        ctx.arc(x,y,r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    };

    Game.prototype.drawRect_ = function(x,y,w,h) {
        ctx.beginPath();
        ctx.rect(x,y, w, h);
        ctx.fillStyle = 'black';
        ctx.closePath();
        ctx.fill();
    };

    Game.prototype.drawBricks_ = function() {
        var i, j;

        for (i=0; i < N_ROWS; i++) {
            for (j=0; j < N_COLS; j++) {
                if (bricks[i][j] == 1) {
                    this.drawRect_((j * (BRICK_WIDTH + PADDING)) + PADDING,
                            (i * (BRICK_HEIGHT + PADDING)) + PADDING,
                        BRICK_WIDTH, BRICK_HEIGHT);
                }
            }
        }
    };

    Game.prototype.clear_ = function() {
        ctx.clearRect(0, 0, w, h);
    };

    Game.prototype.Initialize = function () {
        document.addEventListener('keyup', this.onkeyup_.bind(this));
        document.addEventListener('keydown', this.onkeydown_.bind(this));

        this.LoadContent();
    };

    Game.prototype.LoadContent = function () {
        this.initBricks_();
        this.GameLoop = setInterval(this.RunGameLoop.bind(this), this.DrawInterval);
    };

    Game.prototype.Update = function () {
        if (this.rightDown) {
            this.paddlex = this.paddlex + 5;
        }
        if (this.leftDown) {
            this.paddlex = this.paddlex - 5;
        }
    };

    Game.prototype.Draw = function () {
        var circleRadius = 10;

        this.drawRect_(this.paddlex, h - this.paddleh, this.paddlew, this.paddleh);
        this.drawBricks_();
        this.drawCircle_(x, y, circleRadius);
    };

    Game.prototype.Check = function() {
        var rowheight, colwidth, row, col;

        rowheight = BRICK_HEIGHT + PADDING;
        colwidth = BRICK_WIDTH + PADDING;
        row = Math.floor(y/rowheight);
        col = Math.floor(x/colwidth);
        //if so, reverse the ball and mark the brick as broken
        if (y < N_ROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy;
            bricks[row][col] = 0;
        }

        if (x + dx > w || x + dx < 0) {
            dx =- dx;
        }

        if (y + dy > h || y + dy < 0) {
            dy =- dy;
        }

        if (y + dy > h - this.paddleh) {
            if (x > this.paddlex && x < this.paddlex + this.paddlew) {
                dy = -dy;
            } else {
                clearInterval(this.GameLoop);
            }
        }

        x += dx;
        y += dy;
    };

    Game.prototype.RunGameLoop = function (game) {
        this.clear_();

        this.Update();
        this.Draw();
        this.Check();
    };

    var game = new Game();

});                 