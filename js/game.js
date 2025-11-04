// Object Drop & Catch Game - JavaScript Logic
// This is a simplified version of the game logic

class SimpleDropCatchGame {
    constructor() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.gameRunning = false;
    this.catcherPosition = 50;
    this.fallingObjects = [];
    this.gameSpeed = 2000;
    }
    
    startGame() {
    this.gameRunning = true;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    console.log("Game started! Use A/D or arrow keys to move the catcher.");
    }
    
    moveCatcher(direction) {
    if (!this.gameRunning) return;
    if (direction === 'left') {
    this.catcherPosition = Math.max(0, this.catcherPosition - 10);
    } else if (direction === 'right') {
    this.catcherPosition = Math.min(100, this.catcherPosition + 10);
    }
    console.log(`Catcher moved to position: ${this.catcherPosition}%`);
    }
    
    createFallingObject() {
    if (!this.gameRunning) return;
    const objectType = Math.random();
    let points = 0;
    let isBad = false;
    if (objectType < 0.6) {
    // Good object (green)
    points = 10;
    console.log("Green object dropped - catch it for +10 points!");
    } else if (objectType < 0.9) {
    // Bad object (red)
    isBad = true;
    console.log("Red object dropped - avoid it or lose a life!");
    } else {
    // Bonus object (gold)
    points = 50;
    console.log("Gold bonus object dropped - catch it for +50 points!");
    }
    this.fallingObjects.push({
    left: Math.random() * 85 + 7.5,
    points: points,
    isBad: isBad,
    caught: false
    });
    }
    
    checkCollision() {
    this.fallingObjects.forEach(obj => {
    if (obj.caught) return;
    // Simple collision detection
    const distance = Math.abs(obj.left - this.catcherPosition);
    if (distance < 15) { // Within catching range
    obj.caught = true;
    if (obj.isBad) {
    this.score = Math.max(0, this.score - 20); // Deduct 20 points for catching bad object
    this.lives--;
    console.log(`Caught bad object! Score: ${this.score}, Lives remaining: ${this.lives}`);
    if (this.lives <= 0) {
    this.gameOver();
    }
    } else {
    this.score += obj.points;
    console.log(`Caught good object! Score: ${this.score}`);
    // Level up every 100 points
    if (this.score > 0 && this.score % 100 === 0) {
    this.levelUp();
    }
    }
    }
    });
    }
    
    levelUp() {
    this.level++;
    this.gameSpeed = Math.max(500, this.gameSpeed - 200);
    console.log(`Level up! Now at level ${this.level}. Game speed increased!`);
    }
    
    gameOver() {
    this.gameRunning = false;
    console.log(`Game Over! Final Score: ${this.score}, Level Reached: ${this.level}`);
    }
    
    getGameState() {
    return {
    score: this.score,
    lives: this.lives,
    level: this.level,
    running: this.gameRunning,
    catcherPosition: this.catcherPosition
    };
    }
    }
    
    // Example usage:
    const game = new SimpleDropCatchGame();
    game.startGame();
    
    // Simulate some game actions
    setTimeout(() => {
    game.createFallingObject();
    game.moveCatcher('right');
    game.checkCollision();
    }, 1000);
    
    setTimeout(() => {
    game.createFallingObject();
    game.moveCatcher('left');
    game.checkCollision();
    }, 2000);
    
    setTimeout(() => {
    console.log("Current game state:", game.getGameState());
    }, 3000);
    