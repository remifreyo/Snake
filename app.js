/*----- constants -----*/
const board = document.querySelector('.board')
const hTag = document.querySelector('h1')
/*----- state variables -----*/
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5
let score = 0
let highscore = localStorage.getItem('highscore') || 0
let snakeFood
let snakeBody = [{ x: headRow, y: headColumn }]
let horizontalDirection = 0
let verticalDirection = 0
let gameIsOver = false
let paused = false
let interval
let gameSpeed = 240
let scoreIncreased = false
/*----- cached elements  -----*/

/*----- functions -----*/

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
const gameOver = (e) => {
  if (e.target.innerText === 'Play Again!') {
    location.reload()
  }
}

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

const increseScore = () => {
  if (score > 0 && score % 3 === 0 && scoreIncreased === false) {
    gameSpeed += 5
    scoreIncreased = true
    interval = setInterval(init, gameSpeed)
  } else if (score % 3 !== 0) {
    scoreIncreased = false
  }
}

const init = () => {
  if (gameIsOver === false) {
    collideWithSelf()
    increseScore()
    snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`
    for (i = snakeBody.length - 1; i >= 0; i--) {
      p = i - 1
      if (snakeBody[0].x >= 1 && snakeBody[0].x <= 25 && paused === false) {
        if (snakeBody[0] === snakeBody[i]) {
          snakeBody[i].x += verticalDirection
        } else {
          snakeBody[i].x = snakeBody[p].x
          snakeBody[i].y = snakeBody[p].y
        }
      } else if (snakeBody[0].x < 1 || snakeBody[0].x > 25) {
        gameIsOver = true
        console.log(
          snakeBody[snakeBody.length - 1].x,
          snakeBody[snakeBody.length - 1].y
        )
      }
      if (snakeBody[0].y >= 1 && snakeBody[0].y <= 25 && paused === false) {
        if (snakeBody[0] === snakeBody[i]) {
          snakeBody[i].y += horizontalDirection
        } else {
          snakeBody[i].x = snakeBody[p].x
          snakeBody[i].y = snakeBody[p].y
        }
      } else if (snakeBody[0].y < 1 || snakeBody[0].y > 25) {
        gameIsOver = true
        console.log(
          snakeBody[snakeBody.length - 1].x,
          snakeBody[snakeBody.length - 1].y
        )
      }
    }
    let snake = ''
    snakeBody.forEach((square) => {
      snake += `<div class="head" style="grid-area: ${square.x} / ${square.y}"></div>`
    })
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
    board.innerHTML = snakeFood + snake
    document.querySelector('button').style.visibility = 'hidden'
    document.querySelector('#score').innerHTML = 'Score:' + ' ' + score
    document.querySelector('#high-score').innerHTML =
      'Highest Score:' + ' ' + highscore
  } else {
    hTag.style.color = 'red'
    hTag.innerText = 'Game Over'
    if (score > highscore) {
      document.querySelector('#high-score').innerHTML =
        'Highest Score:' + ' ' + score
      localStorage.setItem('highscore', score)
    } else {
      'Highest Score:' + ' ' + highscore
    }
    board.innerHTML = ''
    document.querySelector('button').style.visibility = 'visible'
  }
}

const pauseResume = (e) => {
  if (e.code === 'Space' && paused === false) {
    clearInterval(interval)
    paused = true
  } else if (e.code === 'Space' && paused === true) {
    interval = setInterval(init, gameSpeed)
    paused = false
  }
}

interval = setInterval(init, gameSpeed)

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
document.addEventListener('click', gameOver)
document.addEventListener('keydown', pauseResume)
