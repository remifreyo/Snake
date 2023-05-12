/*----- constants -----*/
// Game Board
const board = document.querySelector('.board')

//Game Main Title Tag
const hTag = document.querySelector('h1')

// Game Background
const gameBackground = (document.querySelector('html').style.backgroundImage =
  "url('bg.jpeg')")

/*----- state variables -----*/
// Generate two random numbers to create  and place a div (the red "Apple") on a CSS Grid (25x25)
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1

// Generate two random numbers to create and place a div on the CSS Grid (25x25)
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5

// Set the score to 0
let score = 0

// Grab the Highest Score in memory or if non-existent set it to 0
let highscore = localStorage.getItem('highscore') || 0

// Store the Position of Snake's Body into Objects inside of an Array
let snakeBody = [{ x: headRow, y: headColumn }]

// Track Snakes Current Direction
let horizontalDirection = 0
let verticalDirection = 0

// End Game when Player Loses
let gameIsOver = false

// Switch Pause State On or Off with Space Bar
let paused = false

// Set Speed of Game in ms
let gameSpeed = 200

// Used to Hold the Set Interval Function Called On Init
let interval

// Track Score Increases
let scoreIncreased = false

/*----- cached elements  -----*/

/*----- functions -----*/

// Move Snake with Arrow Keys
const moveSnake = (e) => {
  if (e.key === 'ArrowLeft' && horizontalDirection !== 1 && paused === false) {
    horizontalDirection = -1
    verticalDirection = 0
  }
  if (e.key === 'ArrowUp' && verticalDirection !== 1 && paused === false) {
    verticalDirection = -1
    horizontalDirection = 0
  }
  if (
    e.key === 'ArrowRight' &&
    horizontalDirection !== -1 &&
    paused === false
  ) {
    horizontalDirection = 1
    verticalDirection = 0
  }
  if (e.key === 'ArrowDown' && verticalDirection !== -1 && paused === false) {
    verticalDirection = 1
    horizontalDirection = 0
  }
  init()
}

// Refresh the Page and Reset the Game with the "Play Again!" Button
const gameOver = (e) => {
  if (e.target.innerText === 'Play Again!') {
    location.reload()
  }
}

// End Game when Snake Collides with Himself
const collideWithSelf = () => {
  for (i = snakeBody.length - 1; i > 0; i--) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      gameIsOver = true
    }
  }
}

// Move Apple to Random Spots on the Board until it's At a Spot of it's Own
const moveApple = () => {
  foodRow = Math.floor(Math.random() * 25) + 1
  foodColumn = Math.floor(Math.random() * 25) + 1
  for (i = snakeBody.length - 1; i >= 0; i--) {
    if (snakeBody[i].x === foodRow && snakeBody[i].y === foodColumn) {
      foodRow = Math.floor(Math.random() * 25) + 1
      foodColumn = Math.floor(Math.random() * 25) + 1
    }
  }
}

// Increase Game Speed by a Alterable Divisible of Score to Add Dificulty
const increaseSpeed = () => {
  if (score > 0 && score % 2 === 0 && speedIncreased === false) {
    gameSpeed -= 35
    speedIncreased = true
    clearInterval(interval)
    interval = setInterval(init, gameSpeed)
  } else if (score % 2 !== 0) {
    speedIncreased = false
  }
}

// Pause the Game using Spacebar
const pauseResume = (e) => {
  if (e.code === 'Space' && paused === false) {
    clearInterval(interval)
    paused = true
  } else if (e.code === 'Space' && paused === true) {
    interval = setInterval(init, gameSpeed)
    paused = false
  }
}

const init = () => {
  // Run This Entire Block As Long As The Game isn't Over
  if (gameIsOver === false) {
    // Snake
    let snake = ''

    // The Snake Apple
    let snakeFood

    // Check to See If Snake Collides with Himself
    collideWithSelf()

    // Increase GameSpeed Based on Current Score
    increaseSpeed()

    // Add the Apple to the Screen
    snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`

    // Add Snakes Body to the Screen
    snakeBody.forEach((square) => {
      if (snakeBody[0].x < 1 || snakeBody[0].y < 1) return
      snake += `<div class="head" style="grid-area: ${square.x} / ${square.y}"></div>`
    })

    // Control Snakes Vertical Direction and Append his Body to his Head
    for (i = snakeBody.length - 1; i >= 0; i--) {
      p = i - 1
      if (snakeBody[0].x >= 1 && snakeBody[0].x <= 25 && paused === false) {
        if (snakeBody[0] === snakeBody[i]) {
          snakeBody[i].x += verticalDirection
        } else {
          snakeBody[i].x = snakeBody[p].x
          snakeBody[i].y = snakeBody[p].y
        }
        // End Game if Snake Goes Out of Bounds
      } else if (snakeBody[0].x === 0 || snakeBody[0].x > 25) {
        gameIsOver = true
      }
      // Control Snakes Horizontal Direction and Append his Body to his Head
      if (snakeBody[0].y >= 1 && snakeBody[0].y <= 25 && paused === false) {
        if (snakeBody[0] === snakeBody[i]) {
          snakeBody[i].y += horizontalDirection
        } else {
          snakeBody[i].x = snakeBody[p].x
          snakeBody[i].y = snakeBody[p].y
        }
        // End Game if Snake Goes Out of Bounds
      } else if (snakeBody[0].y === 0 || snakeBody[0].y > 25) {
        gameIsOver = true
      }
    }

    // If Snake Eats the Food Make him Bigger, Increase the Score & Move the Apple
    if (snakeBody[0].y === foodColumn && snakeBody[0].x === foodRow) {
      if (verticalDirection === 1) {
        snakeBody.push({
          x: snakeBody[snakeBody.length - 1].x - 1,
          y: snakeBody[snakeBody.length - 1].y
        })
      }
      if (verticalDirection === -1) {
        snakeBody.push({
          x: snakeBody[snakeBody.length - 1].x + 1,
          y: snakeBody[snakeBody.length - 1].y
        })
      }
      if (horizontalDirection === -1) {
        snakeBody.push({
          x: snakeBody[snakeBody.length - 1].x,
          y: snakeBody[snakeBody.length - 1].y + 1
        })
      }
      if (horizontalDirection === 1) {
        snakeBody.push({
          x: snakeBody[snakeBody.length - 1].x,
          y: snakeBody[snakeBody.length - 1].y - 1
        })
      }
      moveApple()
      score++
    }

    // Populate the Board with Snake and His Food
    board.innerHTML = snakeFood + snake

    // Set 'Play Again!' Button Visibility to Hidden
    document.querySelector('#restart').style.visibility = 'hidden'

    // Set the Score
    document.querySelector('#score').innerHTML = 'Score:' + ' ' + score

    // Set the Highscore
    document.querySelector('#high-score').innerHTML =
      'Highest Score:' + ' ' + highscore

    // If Game is Over, Update Scores, Clear the Board, Alert User, & Make 'Play Again!' Button Visible
  } else {
    hTag.innerText = 'Game Over'
    if (score > highscore) {
      document.querySelector('#high-score').innerHTML =
        'Highest Score:' + ' ' + score
      localStorage.setItem('highscore', score)
    } else {
      'Highest Score:' + ' ' + highscore
    }
    board.innerHTML = ''
    document.querySelector('#restart').style.visibility = 'visible'
  }
}

// Initialize and Re-Render at a Specified Speed
interval = setInterval(init, gameSpeed)

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
document.addEventListener('click', gameOver)
document.addEventListener('keydown', pauseResume)
