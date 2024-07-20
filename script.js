let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelectorAll(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;

// Display all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef[0].classList.remove("hide");
}

// Enable all buttons (For new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable group
    popupRef[0].classList.add("hide");
}

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    msgRef.innerHTML = `&#x1F389; <br> '${letter}' Wins!`;
}

// This function is executed when the game is a draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = `&#x1F60E; <br> It's a Draw!`;
}

// New game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

// Restart game
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

// Win logic
const winChecker = () => {
    // Loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled
        // If 3 elements are the same, it would give win as would
        if (element1 !== "" && element2 !== "" && element3 !== "") {
            if (element1 === element2 && element2 === element3) {
                // If all 3 buttons have the same values, pass the value to winFunction
                winFunction(element1);
                return; // Exit the function after finding a winner
            }
        }
    }
}

// Add event listeners to each button
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            // Display O
            element.innerText = "O";
            element.disabled = true;
        }
        // Increment count on each click
        count += 1;
        if (count === 9) {
            drawFunction();
        }
        // Check for win on every click
        winChecker();
    });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
