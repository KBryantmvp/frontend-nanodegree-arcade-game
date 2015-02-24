// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -102;
    // this.y = 214;
    var enemyRow = [1, 2, 3];
    this.row = enemyRow[(Math.floor(Math.random() * enemyRow.length))];
    this.y = this.row;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    for (var i=0; i<allEnemies.length; i++) {
        if (allEnemies[i].x <= ctx.canvas.width) {
            allEnemies[i].x += allEnemies[i].speed * dt;
        } else {
            allEnemies.splice(i, 1);
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 0, 76, 100, 67, this.x, enemyRowOffset[this.y], 100, 67);
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


//arrays with the pixel where columns and rows start
var col = [0, 101, 202, 303, 404]; //5 columns with 101 pixels width starting in pixel 0
var enemyRowOffset = [58, 141, 224, 307, 390, 473]; //6 rows with 83 pixels height starting in pixel 58 (that is first water block)

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200; //initial position for player in the x axis
    this.y = 400; //initial position for player in the y axis
    this.direction = ['left', 'up', 'right', 'down']; //possible movements for player
    this.key; //keeps the value of direction[] after pressing the corresponding arrow in the keyboard
    this.move = false; //becomes true right after releasing one of the arrow keys
}

Player.prototype.update = function() {
    // this will be executed once we release one of the arrow keys
    while (this.move) {
        if (this.key == this.direction[0]) {
            this.x -= 100;
            this.move = false;
        } else if (this.key == this.direction[1]) {
            // this.y -= Resources.get(stone_block).height / 2;
            this.y -= 83;
            this.move = false; 
        } else if (this.key == this.direction[2]) {
            this.x +=100;
            this.move = false;
        } else {
            // this.y += Resources.get(stone_block).height / 2;
            this.y += 83;
            this.move = false;
        }
        
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    // checks which arrow key has been pressed and assigns the corresponding direction
    // to the key variable. Changes move to true.
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
// if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
//     // collision detected!


//TODO: redefine method for better width detection
var checkCollisions = function() {
    for (var i=0; i<allEnemies.length; i++) {
        if (player.x + 17 < allEnemies[0].x + Resources.get(allEnemies[0].sprite).width - 1 &&
            player.x + Resources.get(player.sprite).width - 16 > allEnemies[0].x &&
            player.y + 63 < allEnemies[0].y + Resources.get(allEnemies[0].sprite).height - 28 &&
            player.y + Resources.get(player.sprite).height - 31 > allEnemies[0].y + 76) {
            // alert ("COLLISION!");
            console.log("nooooo");
            return true;
        }
    }
}

var test = function() {
    console.log("test");
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy(20);
var enemy2 = new Enemy(70);
allEnemies.push(enemy1, enemy2);
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
