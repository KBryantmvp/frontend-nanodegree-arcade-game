// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -102;
    var enemyRow = [1, 2, 3];
    var enemyRowOffset = [58, 141, 224, 307, 390, 473]; //6 rows with 83 pixels height starting in pixel 58
    this.row = enemyRow[(Math.floor(Math.random() * enemyRow.length))];
    this.y = enemyRowOffset[this.row]; // Position of the enemy in the Y axis
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Only updates position if enemy still visible on board
    // otherwise remove enemy from allEnemies[]
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
    ctx.drawImage(Resources.get(this.sprite), 0, 76, 100, 67, this.x, this.y, 100, 67);
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


//arrays with the pixel where columns and rows start
// var col = [0, 101, 202, 303, 404]; //5 columns with 101 pixels width starting in pixel 0


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200; //initial position for player in the X axis
    this.y = 400; //initial position for player in the Y axis
    this.direction = ['left', 'up', 'right', 'down']; //possible movements for player
    this.key; //keeps the value of direction[] after pressing the corresponding arrow in the keyboard
    this.move = false; //becomes true right after releasing one of the arrow keys
    this.lives = 3; // initial lives of player

    //these variables check if the player has reached the limits of the board to avoid
    //moving the player out of bounds
    this.leftBound = true;
    this.upBound = true;
    this.rightBound = true;
    this.downBound = false;

}

Player.prototype.update = function() {
    // this will be executed once we release one of the arrow keys
    while (this.move) {
        if (this.key == this.direction[0]) {
            this.x -= 100;
            this.move = false;
            this.rightBound = true;
            if (this.x == 0) {
                this.leftBound = false;
            }
        } else if (this.key == this.direction[1]) {
            this.y -= 83;
            this.move = false;
            this.downBound = true;
            if (this.y == -15) {
                this.upBound = false;
            }
        } else if (this.key == this.direction[2]) {
            this.x +=100;
            this.move = false;
            this.leftBound = true;
            if (this.x == 400) {
                this.rightBound = false;
            }
        } else {
            this.y += 83;
            this.move = false;
            this.upBound = true;
            if (this.y == 400) {
                this.downBound = false;
            }
        }
        
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This method will be called after a collision with an enemy or after winning a level
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 400;
    this.leftBound = true;
    this.upBound = true;
    this.rightBound = true;
    this.downBound = false;
}

Player.prototype.handleInput = function(keyCode) {
    // checks which arrow key has been pressed and assigns the corresponding direction
    // to the key variable. Changes move to true.
    if (keyCode != null) {
        //the player only moves when it is in of bounds
        if (keyCode === 'left' && this.leftBound) {
            this.key = this.direction[0];
            this.move = true;
        } else if (keyCode === 'up' && this.upBound) {
            this.key = this.direction[1];
            this.move = true;
        } else if (keyCode === 'right' && this.rightBound) {
            this.key = this.direction[2];
            this.move = true;
        } else if (keyCode === 'down' && this.downBound) {
            this.key = this.direction[3];
            this.move = true;
        }
    }
}

// Lives that the player can get during the game
var Heart = function() {
    this.x = 300;
    this.y = 151;
    this.sprite = 'images/Heart.png';

    // If the player gets the life this variable will turn false
    // for the rest of the level
    this.display = true;
}

// Only 2 lives will be available 
Heart.prototype.update = function() {
    if (gameLevel == 1 && this.display) {
        this.x = 300;
        this.y = 151;
    } else if (gameLevel == 2 && this.display) {
        this.x = 0;
        this.y = 68;
    } else {
        this.x = -100;
        this.y = -100;
    }
}

// The life will be drawn in levels 1 and 2 and only if the player
// has not got it yet
Heart.prototype.render = function() {
    if ((gameLevel == 1 || gameLevel == 2) && this.display) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Checks if the player and the enemies have collided
var checkCollisions = function() {
    for (var i=0; i<allEnemies.length; i++) {
        if (player.x + playerOffsetX < allEnemies[i].x + enemyWidth &&
            player.x + playerOffsetX + playerWidth > allEnemies[i].x &&
            player.y + playerOffsetY < allEnemies[i].y + enemyHeight &&
            player.y + playerOffsetY + playerHeight > allEnemies[i].y) {
            player.lives --;
            return true;
        }
    }
}

// Controls and displays canvas on the right including the actual level
// and lives of the player
var playerLives = function() {
    var canvasRight = document.getElementById('canvas-right');
    var ctxRight = canvasRight.getContext('2d');
    ctxRight.fillStyle = 'white';
    ctxRight.fillRect(0, 0, canvasRight.width, canvasRight.height);
    ctxRight.drawImage(Resources.get(playerSelected), 10, 70, 50, 90);

    ctxRight.fillStyle = 'black';
    ctxRight.font = '40px arcadeClassic';
    ctxRight.fillText('X', 59, 145);
    ctxRight.font = '55px arcadeClassic';
    ctxRight.fillText(player.lives, 87, 147);
    ctxRight.fillText('Level ' + gameLevel, 10, 80);
}

// Instatiates the array of enemies for each level
var enemyLevel = function() {
    var speed =[];
    var randomSpeed;
    while (gameLevel == 1 && allEnemies.length < 3) {
        speed = [40, 55, 70];
        randomSpeed = speed[Math.floor(Math.random() * speed.length)];
        allEnemies.push(new Enemy(randomSpeed));
    }
    while (gameLevel ==2 && allEnemies.length < 4) {
        speed = [55, 70, 100];
        randomSpeed = speed[Math.floor(Math.random() * speed.length)];
        allEnemies.push(new Enemy(randomSpeed));
    }
    while (gameLevel == 3 && allEnemies.length < 5) {
        speed = [70, 100, 110];
        randomSpeed = speed[Math.floor(Math.random() * speed.length)];
        allEnemies.push(new Enemy(randomSpeed));
    }
}

// Checks if the player and the heart have collided
var addLife = function() {
    if (player.x + playerOffsetX < heart.x + heartOffsetX + heartWidth &&
        player.x + playerOffsetX + playerWidth > heart.x + heartOffsetX &&
        player.y + playerOffsetY < heart.y + heartOffsetY + heartHeight &&
        player.y + playerOffsetY + playerWidth > heart.y + heartOffsetY) {
        heart.display = false;
        player.lives ++;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Offsets in pixels for the actual space that player, enemy and
// heart occupy inside their own image
var playerOffsetX = 17;
var playerOffsetY = 63;
var playerWidth = 68;
var playerHeight = 77;
var enemyWidth = 100;
var enemyHeight = 67;
var heartOffsetX = 6;
var heartOffsetY = 48;
var heartWidth = 90;
var heartHeight = 90;
var allEnemies = []; // Array of Enemy objects
var gameLevel = 1; //keep tracks the game level starting in level 1
var player = new Player(); // Instantiates the Player object
var heart = new Heart(); // Instantiates the Heart object



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
