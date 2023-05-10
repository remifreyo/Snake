/*----- constants -----*/
const board = document.querySelector('.board')
const hTag = document.querySelector('h1')
/*----- state variables -----*/
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5
let score = 0
let highscore = 0
let snakeFood
let snakeBody = [{ x: headRow, y: headColumn }]
let horizontalDirection = 0
let verticalDirection = 0
let gameIsOver = false
/*----- cached elements  -----*/

/*----- functions -----*/

const moveSnake = (e) => {
  if (e.key === 'ArrowLeft' && horizontalDirection !== 1) {
    horizontalDirection = -1
    verticalDirection = 0
  }
  if (e.key === 'ArrowUp' && verticalDirection !== 1) {
    verticalDirection = -1
    horizontalDirection = 0
  }
  if (e.key === 'ArrowRight' && horizontalDirection !== -1) {
    horizontalDirection = 1
    verticalDirection = 0
  }
  if (e.key === 'ArrowDown' && verticalDirection !== -1) {
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

const collideWithSelf = () => {}

const moveApple = () => {
  foodRow = Math.floor(Math.random() * 25) + 1
  foodColumn = Math.floor(Math.random() * 25) + 1
}
const init = () => {
  if (gameIsOver === false) {
    snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`

    for (i = snakeBody.length - 1; i >= 0; i--) {
      p = i - 1
      if (snakeBody[0].x >= 1 && snakeBody[0].x <= 25) {
        if (
          snakeBody[0].y === snakeBody[i].y ||
          snakeBody[p].y === snakeBody[i].y
        ) {
          snakeBody[i].x += verticalDirection
        } else {
          snakeBody[i].y += -verticalDirection
        }
      } else if (snakeBody[0].x < 1 || snakeBody[0].x > 25) {
        gameIsOver = true
      }
      if (snakeBody[0].y >= 1 && snakeBody[0].y <= 25) {
        if (
          snakeBody[0].x === snakeBody[i].x ||
          snakeBody[p].x === snakeBody[i].x
        ) {
          snakeBody[i].y += horizontalDirection
        } else {
          snakeBody[i].x += -horizontalDirection
        }
      } else if (snakeBody[0].y < 1 || snakeBody[0].y > 25) {
        gameIsOver = true
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
  } else {
    hTag.style.color = 'red'
    hTag.innerText = 'Game Over'
    if (score > highscore) {
      document.querySelector('#high-score').innerHTML =
        'Highest Score:' + ' ' + score
    }
    board.innerHTML = ''
    document.querySelector('button').style.visibility = 'visible'
  }
}

setInterval(init, 170)

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
document.addEventListener('click', gameOver)
