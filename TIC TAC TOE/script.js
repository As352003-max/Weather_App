const boxes=document.querySelectorAll(".box");
// to fetch all the boxes here we use querySelectorAll
const gameInfo=document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;


const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create a function to initialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // we also have to empty the boxes on UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents ="all";
        // one more thing is missing, initialize box with css properties again
        box.classList = `box box${index+1}`
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();


// this swapTurn functon is used to chase the turns and fill the X and O accordingly 
function swapTurn(){
    if (currentPlayer==="X") {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    // UI Update
    gameInfo.innerText=`CurentPlayer-${currentPlayer}`;
}



// this checkGameOver function is the main function which is used to tell who wins
function checkGameOver(){
    let answer="";
     winningPosition.forEach((position)=>{

        // all three boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])) {
            
            // check if winner is X
            if (gameGrid[position[0]]==="X") 
                answer="X";
                else
                answer="O";

                // disable pointer events
                boxes.forEach((box) =>{
                    box.style.pointerEvents="none";
                })

                // now we know X or O is the winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                
            }
        
     });

    //  it means that we have a winner 
    if (answer!=="") {
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");


}
}




// here we are mapping a function onto the boxes so that on clicking we get X or O
function handleClick(index){
    if (gameGrid[index]==="") {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents ="none";
        // swap karo turn ko
        swapTurn();
        // check koi jeet toh nahi gaya 
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
box.addEventListener("click",()=>{
   handleClick(index) ;
    // here we have applied handlclick function on boxes because of which on clicking we get to know the index on which we have clicked
})
});

newGameBtn.addEventListener("click",initGame);

