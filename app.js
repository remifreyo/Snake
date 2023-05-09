/*----- constants -----*/
const board = document.querySelector('.board')
/*----- state variables -----*/
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5
let score
let highscore
let snakeDirection = 0
/*----- cached elements  -----*/

/*----- functions -----*/

const moveSnake = (e) => {
  if (e.key === 'ArrowLeft') {
    if (headColumn > 1) {
      snakeDirection = -1
      headColumn += snakeDirection
      init()
    } else {
    }
  }
  if (e.key === 'ArrowUp') {
    if (headRow > 1) {
      snakeDirection = -1
      headRow += snakeDirection
      init()
    } else {
    }
  }
  if (e.key === 'ArrowRight') {
    if (headColumn < 25) {
      snakeDirection = 1
      headColumn += snakeDirection
      init()
    } else {
    }
  }
  if (e.key === 'ArrowDown') {
    if (headRow < 25) {
      snakeDirection = 1
      headRow += snakeDirection
      init()
    } else {
    }
  }
}
const init = () => {
  let snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`
  let snakeHead = `<div class ="head" style="grid-area: ${headRow} / ${headColumn}"></div>`
  board.innerHTML = snakeFood + snakeHead
}
init()

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
document.addEventListener('click', init)
