const puzzleContainer = document.querySelector("#puzzle-container")
const buttonStart=document.querySelector("#start")
const buttonReset=document.querySelector("#reset")
const buttonCheck=document.querySelector("#check")

let puzzle = []
let size = 5

time=0;
buttonStart.addEventListener('click', (event) => {

    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
    handleInput()

    setInterval(()=>document.getElementById('timer').innerHTML
    = time++,1000);
})

buttonReset.addEventListener('click',(event)=>{
    clearInterval();
})
buttonCheck.addEventListener('click',(event)=>
{
   if(check()) 
  { clearInterval();
   document.getElementById('time').innerHTML=time;
   document.getElementById('messege').innerHTML=
   "Your puzzle is ready!";
  }
   else
   {
    document.getElementById('messege').innerHTML=
    "Your puzzle is not ready!";  
   }

})

function getRow(pos) {
    return Math.ceil(pos / size)
}

function getCol(pos) {
    const col = pos % size
    if (col === 0) {
        return size
    }
    return col
}

function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
        puzzle.push({
            value: i,
            position: i,
            x: (getCol(i) - 1) * 200,
            y: (getRow(i) - 1) * 200,
            disabled: false,
        })
    }
}

function renderPuzzle() {
    puzzleContainer.innerHTML = ""
    for (let puzzleItem of puzzle) {
        if (puzzleItem.disabled) continue
        puzzleContainer.innerHTML += `
            <div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
                ${puzzleItem.value}
            </div>
        `
    }
}

function randomizePuzzle() {
    const randomValues = getRandomValues()

    let i = 0
    for (let puzzleItem of puzzle) {
        puzzleItem.value = randomValues[i]
        i++
    }

    const emptyPuzzleItem = puzzle.find((item) => item.value === size * size)
    emptyPuzzleItem.disabled = true
    
}

function getRandomValues() {
    const values = []
    for (let i = 1; i <= size * size; i++) {
        values.push(i)
    }

    const randomValues = values.sort(() => Math.random() - 0.5)
    return randomValues
}

function handleInput() {
    document.addEventListener("keydown", handleKeyDown)
}

function handleKeyDown(e) {
    console.log(e.key)
    switch (e.key) {
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
    }
    renderPuzzle()
}

function moveLeft() {
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    if (rightPuzzle) {
        swapPositions(emptyPuzzle, rightPuzzle, true)
    }
}
function moveRight() {
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()
    if (leftPuzzle) {
        swapPositions(emptyPuzzle, leftPuzzle, true)
    }
}
function moveUp() {
    const emptyPuzzle = getEmptyPuzzle()
    const belowPuzzle = getBelowPuzzle()
    if (belowPuzzle) {
        swapPositions(emptyPuzzle, belowPuzzle, false)
    }
}
function moveDown() {
    const emptyPuzzle = getEmptyPuzzle()
    const abovePuzzle = getAbovePuzzle()
    if (abovePuzzle) {
        swapPositions(emptyPuzzle, abovePuzzle, false)
    }
}

function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
  
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp



    if (isX) {
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp
    } else {
        // must be y
        temp = firstPuzzle.y
        firstPuzzle.y = secondPuzzle.y
        secondPuzzle.y = temp
    }
}

function getRightPuzzle() {

    const emptyPuzzle = getEmptyPuzzle()
    const isRightEdge = getCol(emptyPuzzle.position) === size
    if (isRightEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
    return puzzle
}
function getLeftPuzzle() {

    const emptyPuzzle = getEmptyPuzzle()
    const isLeftEdge = getCol(emptyPuzzle.position) === 1
    if (isLeftEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
    return puzzle
}
function getAbovePuzzle() {

    const emptyPuzzle = getEmptyPuzzle()
    const isTopEdge = getRow(emptyPuzzle.position) === 1
    if (isTopEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - size)
    return puzzle
}
function getBelowPuzzle() {

    const emptyPuzzle = getEmptyPuzzle()
    const isBottomEdge = getRow(emptyPuzzle.position) === size
    if (isBottomEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + size)
    return puzzle
}

function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled)
}

function getPuzzleByPos(pos) {
    return puzzle.find((item) => item.position === pos)
}
function check()
{
    for(let puzzleItem of puzzle)
    {
        if(puzzleItem.disabled)
        {
            if(puzzleItem.position!=size*size)
            return false;
        }
        else if (puzzleItem.value!=puzzleItem.position)
              return false;
    }
    return true;
}
