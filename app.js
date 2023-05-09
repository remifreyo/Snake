/*----- constants -----*/
const board = document.querySelector('.board')
/*----- state variables -----*/
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5
let score
let highscore
let snakeFood
let snakeHead
let horizontalDirection = 0
let verticalDirection = 0
/*----- cached elements  -----*/

/*----- functions -----*/

const moveSnake = (e) => {
  if (e.key === 'ArrowLeft') {
    horizontalDirection = -1
    verticalDirection = 0
  }
  if (e.key === 'ArrowUp') {
    verticalDirection = -1
    horizontalDirection = 0
  }
  if (e.key === 'ArrowRight') {
    horizontalDirection = 1
    verticalDirection = 0
  }
  if (e.key === 'ArrowDown') {
    verticalDirection = 1
    horizontalDirection = 0
  }
  init()
}
const init = () => {
  snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`
  snakeHead = `<div class ="head" style="grid-area: ${headRow} / ${headColumn}"></div>`
  if (headRow > 1 && headRow < 25) {
    headRow += verticalDirection
  } else if (headRow === 1) {
    headRow += 1
  } else if (headRow === 25) {
    headRow += -1
  }
  if (headColumn > 1 && headColumn < 25) {
    headColumn += horizontalDirection
  } else if (headColumn === 1) {
    headColumn += 1
  } else if (headColumn === 25) {
    headColumn += -1
  }

  board.innerHTML = snakeFood + snakeHead
}
setInterval(init, 170)

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
document.addEventListener('click', init)
