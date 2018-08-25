
 // Get Random Number
let randomNumber = () => Math.floor((Math.random() * 3) + 1);

// Win Modal
var modal = document.querySelector(".modal");
var modal2 = document.querySelector(".modal2");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");
var closeButton2 = document.querySelector(".close-button2");

function toggleModal() {
    modal.classList.toggle("show-modal");
};

function toggleModal2() {
    modal2.classList.toggle("show-modal");
};

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
    else if(e.target === modal2){
      toggleModal2();
    }
};

closeButton.addEventListener("click", toggleModal);
closeButton2.addEventListener("click", toggleModal2);
window.addEventListener("click", windowOnClick);




class Enemy{
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = (randomNumber())*70;
        this.speed = (randomNumber())*100;
    }

    update(dt) {
        // multiplying any movement by the dt parameter
        // ensures the game runs at the same speed for
        // all computers.
        if(this.x >= 500){
            this.x = 0;
            this.y = (randomNumber())*70;
        }
        this.x += this.speed * dt;
    }

    render(){

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// player class
class Player{
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 410;
        this.speed = 20;
        this.win = 0;
        this.life = 5;
        this.game = true;
        this.timer = 0;
    }

    reset(){
    this.x = 200;
		this.y = 410;
    }

    gameReset(){
    this.life = 5;
		this.win = 0;
		this.game = true;
    this.timer = 0;
		this.reset();
    }

    score_win(){
        this.win += 1;
        toggleModal();
        this.reset();
    }

    score_lost(){
      this.win -= 1;
	    this.life -= 1;
    }

    timer_start(){
    let that = this;
    setInterval(function(){
      player.timer++;
    }, 1000);
    };

    checkCollisions(){
        for (var i = 0; i < allEnemies.length; i++) {
            if ((allEnemies[i].x) <= this.x + 30 &&
                (allEnemies[i].x + 30) >= (this.x) &&
                (allEnemies[i].y)<= this.y + 30 &&
                (allEnemies[i].y + 30) >= (this.y)) {
                        this.score_lost();
                        this.reset();
            }
        }
    }

    checkForWinner(){
        if (this.y <=10){
            this.score_win();
        }
    }

    update(){
        this.checkCollisions();
        this.checkForWinner();
        if (this.game == true){
            this.checkGameOver();
        }
        if(this.y <= 5){
            this.reset();
        }
    }

    checkGameOver(){
        if (this.life == 0){
            toggleModal2();
            this.game = false;
            this.gameReset();
		}
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(inputKey){
        switch (inputKey) {
            case 'left':
              this.x <= 10 ? this.x = 0 : this.x -= 100;
              break;
            case 'right':
              this.x >= 400 ? this.x = 400 : this.x += 100;
              break;
            case 'up':
              this.y <= 10 ? this.y = -10 : this.y -= 80;
              break;
            case 'down':
              this.y >= 400 ? this.y = 400 : this.y += 80;
              break;
          }
    }
};



// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// instantiating objects.
// All enemy objects are placed in an array called allEnemies
// player object is placed in a variable called player

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();
player.timer_start();
