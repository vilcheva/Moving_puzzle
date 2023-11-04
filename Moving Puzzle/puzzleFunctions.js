
const puzzleContainer = document.querySelector("#puzzle-container")
const buttonStart=document.querySelector("#start")
const buttonReset=document.querySelector("#reset")
const buttonCheck=document.querySelector("#check")

let puzzle = []
let size = 3
let time=0;
let interval;

    buttonStart.addEventListener('click', (event) => {
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
    handleInput()

    interval=setInterval(()=>document.getElementById('timer').innerHTML
    = time++,1000);
})

    buttonReset.addEventListener('click',(event)=>{
        clearInterval(interval);
    })
    buttonCheck.addEventListener('click',(event)=>
    {
       //changeRecord()
       if(check()) 
      { 
        clearInterval(interval);
       document.getElementById('timer').innerHTML=time;
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
        case "1":
            move(1)
            break
        case"End":
            move(1)
            break
        case "2":
            move(2)
            break
        case "ArrowDown":
            move(2)
            break
        case "3":
            move(3)
            break
        case "PageDown":
            move(3)
            break
        case "4":
            move(4)
            break
        case "ArrowLeft":
            move(4)
            break
        case "5":
            move(5)
            break
        case "Clear":
            move(5)
            break
        case "6":
            move(6)
            break
        case "ArrowRight":
            move(6)
            break
        case "7":
            move(7)
            break
        case "Home":
            move(7)
            break
        case "8":
            move(8)
            break
        case "ArrowUp":
            move(8)
            break             
    
    }
    renderPuzzle()
}
function move(number)
{
    const puzzlePart=getPuzzleByNumber(number)
    const empty=getEmptyPuzzle()
   if(getRow(puzzlePart.position)===getRow(empty.position)&&(getCol(puzzlePart.position)-1===getCol(empty.position)
    || getCol(puzzlePart.position)+1===getCol(empty.position)))
    {
        swap(empty,puzzlePart)
    }
    else  if(getCol(puzzlePart.position)===getCol(empty.position)&&(getRow(puzzlePart.position)-1===getRow(empty.position)
     || getRow(puzzlePart.position)+1===getRow(empty.position)))
    {
        swap(empty,puzzlePart)
    }
    
}
function swap(firstEl, secondEl)
{
    let temp=firstEl.position
    firstEl.position=secondEl.position
    secondEl.position=temp


        temp = firstEl.x
        firstEl.x = secondEl.x
        secondEl.x = temp
        temp = firstEl.y
        firstEl.y = secondEl.y
        secondEl.y = temp
  
    
}

function getPuzzleByNumber(number){
    return puzzle.find((item) => item.value===number)
}

function getEmptyPuzzle(){
    return puzzle.find((item) => item.disabled)
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


/*function changeRecord(){
let user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
user_records.forEach(element => {
    if(element.flag==true)
    {
        if(element.record>time)
         element.record=time;
    }
      
 })
     localStorage.setItem("users",JSON.stringify(user_records));
}*/
