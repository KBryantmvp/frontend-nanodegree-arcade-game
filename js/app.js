// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // while (this.x <= ctx.canvas.width) {
        this.x += this.speed * dt;
    // console.log(this.x);
    // }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.direction = ['left', 'up', 'right', 'down'];
    this.key;
    this.move = false; //= direction[1];
}

Player.prototype.update = function() {
    while (this.move) {
        if (this.move && this.key == this.direction[0]) {
            this.x -= 100;
            this.move = false;
        } else if (this.move && this.key == this.direction[1]) {
            this.y -= Resources.get(stone_block).height / 2;
            this.move = false; 
        } else if (this.move && this.key == this.direction[2]) {
            this.x +=100;
            this.move = false;
        } else {
            this.y += Resources.get(stone_block).height / 2;
            this.move = false;
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    if (keyCode != null) {
        if (keyCode === 'left') {
            this.key = this.direction[0];
            this.move = true;
        } else if (keyCode === 'up') {
            this.key = this.direction[1];
            this.move = true;
        } else if (keyCode === 'right') {
            this.key = this.direction[2];
            this.move = true;
        } else {
            this.key = this.direction[3];
            this.move = true;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy(0, 225);
allEnemies.push(enemy1);
var player = new Player();

var stone_block = 'images/stone-block.png';


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
