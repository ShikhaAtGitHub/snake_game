var score = 0; // to keep track of food eaten by snake
var timer;
var sec = 300; // 5 minutes given to the player
function start (mode) {
  setTimer();
  // Get the canvas element
  var canvas = document.getElementById('snake_game');
  // get a two dimensional drawing context
  var context = canvas.getContext('2d');
  // var canvasWidth = document.getElementById('width').value;
  // var canvasHeight = document.getElementById('height').value;
  var dir = 'down'; // by default we keep the direction of snake down
  var snakeWidth = 10;
  var snakeHeight = 10;

  // create a snake object, lets suppose we have 4 cells by default
  // snake would have two properties x and y
  var len = 4; // length of a snake array
  var snake = [];

  for (var i = len - 1; i >= 0; i--) {
    snake.push({
      x: i,
      y: 0
    });
  }

  function drawSnake(x, y) {
    // add a color to fill the canvas
    context.fillStyle = '#fff';
    context.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
    // for the border
    context.fillStyle = '#000';
    context.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
  }

  // add a event listener to handle key events
  document.addEventListener('keydown', controlMovementSnake);

  // for controlling the direction of snake using arrows keys
  function controlMovementSnake(e) {
    switch(e.keyCode) {
      case 37: 
      dir = 'left';
      break;
      case 38: 
      dir = 'up';
      break;
      case 39: 
      dir = 'right';
      break;
      case 40: 
      dir = 'down';
      break;
    }
  }

  // create food
  var food = {
    x: Math.round(Math.random()*(canvas.width/snakeWidth - 1) + 1),
    y: Math.round(Math.random()*(canvas.height/snakeHeight - 1) + 1)
  }

  function createFood (x, y) {
    // Select a color to fill the canvas
    context.fillStyle = 'yellow';
    context.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
  
    context.fillStyle = '#fff';
    context.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
  }

  function drawCanvas () {
    context.clearRect(0,0,canvas.width, canvas.height); // erases the pixels in a rectangular area 
    for (var i = 0; i < snake.length; i++) {
      var xx = snake[i].x;
      var yy = snake[i].y;
      drawSnake(xx, yy);
    }
    createFood(food.x, food.y);
    // capture the value of 0th element in snake array
    var snakeXDir = snake[0].x;
    var snakeYDir = snake[0].y;

    // to detect the walls of the canvas to stop the game as and when detected
    if (snakeXDir < 0 || snakeYDir < 0 || snakeXDir >= canvas.width/snakeWidth || snakeYDir >= canvas.height/snakeHeight) {
      context.clearRect(0,0,canvas.width, canvas.height);  // clear the pixels in canvas when walls of canvas is detected
      clearInterval(timer);  // clears the timer
      // document.getElementById('displayTimer').innerHTML= 'GAME OVER!!!';
    }
    // if x and y axis of both snake's 0th element and food are equal, food is eaten and new food is created at random place
    if (snakeXDir === food.x && snakeYDir === food.y) {
      score++; // increment the food eaten by 1
      storeFoodData(score); // call this func to update the local storage
      // food created at a random place
      food = {
        x: Math.round(Math.random()*(canvas.width/snakeWidth - 1) + 1),
        y: Math.round(Math.random()*(canvas.height/snakeHeight - 1) + 1)
      }
    } else {
      // remove the last entry from snake array
      snake.pop();
    }

    if (dir === 'right') snakeXDir++ // increment x-axis value by 1 when direction is towards right
    else if (dir === 'left') snakeXDir-- // decrement x-axis value by 1 when direction is towards left
    else if (dir === 'up') snakeYDir-- // increment y-axis value by 1 when direction is towards right
    else if (dir === 'down') snakeYDir++ // decrement y-axis value by 1 when direction is towards left
    
    var newSnakeHead = { // the newSnakeHead created with the updated x and y value and is added to the 0th index of snake array
      x: snakeXDir,
      y: snakeYDir
    };
    // addng new head at the front
    snake.unshift(newSnakeHead);
  }
  setTimeout (() => {
    setInterval(drawCanvas, 100);
  }, 0);
}

// stores the amount of food eaten by snake
function storeFoodData (score) {
  localStorage.setItem('store', score);
}

// timer to keep track of the player's time
function setTimer(){
  timer = setInterval(function() {
    document.getElementById('displayTimer').innerHTML= sec + ' seconds left!';
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      document.getElementById('displayTimer').innerHTML= 'TIME OUT!!!';
    }
  }, 100);
}
