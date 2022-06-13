let currentState = [{ clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" }
    , { clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" },
{ clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" }, { clicked: 0, playerSymbol: "" }
];  // Saving the initial stage of all of the grids
let choice;
const winningConditions = [  //Saving the wining conditions to be used for win comparison
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentTurnPlayer
let currentTurn;
let players = [];
function generateRandomTern() {    //This function is use to generate random initial tern 
    return (Math.random() > 0.5) ? 1 : 0;
}
function toggleTurn(currentTurn) {   // This functions toggles the tern for both the players 
    return currentTurn == 0 ? 1 : 0;
}
function setCurrentTurn(currentTurnPlayer) {    //After toggling this function sets the current turn
    document.getElementById("players-turn-display").innerText = currentTurnPlayer.name + "'s turn with sign " + currentTurnPlayer.sign

}
function checkStateOfSelectedCell(selectedCell) {  // This function actually checks whether the click grid was already clicked or not
    return currentState[selectedCell].clicked == 0 ? true : false
}
function changeStateOfSelectedCell(selectedCell, currentTurnPlayer) {   // This function changes the state of clicked grid. If it is not clicked already
    currentState[selectedCell].clicked = 1;
    currentState[selectedCell].playerSymbol = currentTurnPlayer.sign;
}
function updateUI(currentTurnPlayer, selectedCell) {  // This function updates the UI once all of the condtion have staisfied
    document.getElementById(selectedCell).innerHTML = currentTurnPlayer.sign
}
function handleWiningCondition() {  // This function is responsible for handling the win condition checking if diagonal, row or column conditions matched
    let flag = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let firstCell = currentState[winCondition[0]];
        let secondCell = currentState[winCondition[1]];
        let thirdCell = currentState[winCondition[2]];
        if (firstCell.clicked == 1 && secondCell.clicked == 1 && thirdCell.clicked == 1) {
            if (firstCell.playerSymbol == "x" && secondCell.playerSymbol == "x" && thirdCell.playerSymbol == "x") {
                setTimeout(() => {
                    alert(`${players[currentTurn].name} with symbol ${players[currentTurn].sign} won the game`)
                    window.location.reload();
                }, 900);
                flag = true;
            }
            else if (firstCell.playerSymbol == "O" && secondCell.playerSymbol == "O" && thirdCell.playerSymbol == "O") {
                setTimeout(() => {
                    alert(`${players[currentTurn].name} with symbol ${players[currentTurn].sign} won the game`);
                    window.location.reload();
                }, 900);
                flag = true;

            }
        }
    }
    if (flag !== true) {
        if (currentState.every((state) => state.clicked === 1 ? true : false)) {
            setTimeout(() => {
                alert("Game drawn")
                window.location.reload();
            }, 900);

        }
        else {
            currentTurn = toggleTurn(currentTurn);
            currentTurnPlayer = players[currentTurn];
            setCurrentTurn(currentTurnPlayer);
        }

    }
}
function handleCellClick(event) {  // This is tha main function that gets called on button clicked. All the above declared functions are called in this function
    const cellTarget = event.target;
    let selectedCell = parseInt(cellTarget.getAttribute("id"));
    if (checkStateOfSelectedCell(selectedCell)) {
        changeStateOfSelectedCell(selectedCell, currentTurnPlayer)
        updateUI(currentTurnPlayer, selectedCell);
        handleWiningCondition();
    }

    if (choice === 'Yes' || choice === 'yes') {
        setTimeout(() => {
            handleComputerRandomTurn();

        }, 400)
    }
}
function handleComputerRandomTurn() { //This function is reponsible for playing as the computer 
    let indexes = []
    for (let i = 0; i < currentState.length; i++) {
        if (currentState[i].clicked == 0) {
            indexes.push(i);
        }
    }
    let i = indexes[Math.floor(Math.random() * indexes.length)];
    if (currentState[i].clicked == 0) {
        changeStateOfSelectedCell(i, currentTurnPlayer);
        updateUI(currentTurnPlayer, i);
        handleWiningCondition();
    }
}
let startFlag = false;
let btnStart = document.getElementById("btnStart");
btnStart.addEventListener('click', () => {
    btnStart.style.display = "none";
    startFlag = true;

    setTimeout(() => {
        mainGame()
    }, 300)
})

function mainGame() {  //mainGame function gets called as the users presses the start button 
    choice = prompt("Would you like to play a 1 player game? Type Yes or No.");
    if (choice === 'No' || choice === 'no') {
        let player1 = prompt("Please Enter Player1 name");
        let player2 = prompt("Please Enter Player2 name");
        document.getElementById("container").style.display = "block"
        players = [{ name: player1, sign: "x" }, { name: player2, sign: "O" }]
        currentTurn = generateRandomTern();
        currentTurnPlayer = players[currentTurn];
        setCurrentTurn(currentTurnPlayer);
        document.querySelectorAll(".item").forEach((cell) => cell.addEventListener("click", handleCellClick))
    }
    else if (choice === 'Yes' || choice === 'yes') {
        let player1 = prompt("Please Enter your name as player");
        let player2 = "Computer"
        document.getElementById("container").style.display = "block"
        players = [{ name: player1, sign: "x" }, { name: player2, sign: "O" }]
        currentTurn = generateRandomTern();
        currentTurnPlayer = players[currentTurn];
        setCurrentTurn(currentTurnPlayer);
        if (currentTurn === 1) {
            handleComputerRandomTurn();
        }
        document.querySelectorAll(".item").forEach((cell) => cell.addEventListener("click", handleCellClick))
    }


}

