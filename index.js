let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".button-36");
let newGameBtn = document.querySelector(".button-37");
let playWithHumanBtn = document.querySelector("#playWithHuman");
let playWithComputerBtn = document.querySelector("#playWithComputer");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let sound = document.querySelector("audio");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let playWithComputer = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const computerMove = () => {
  let emptyBoxes = [...boxes].filter((box) => box.innerText === "");
  if (emptyBoxes.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let selectedBox = emptyBoxes[randomIndex];
    selectedBox.innerText = "X"; // Assuming the computer plays as "X"
    selectedBox.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  }
};

const playVsComputer = () => {
  playWithComputer = true;
  alert("You are playing vs computer,\nAll the best!");
  playWithHumanBtn.disabled = true;
  playWithComputerBtn.disabled = true;
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO && playWithComputer) {
        // PlayerO
        box.innerText = "O";
        //turnO = false;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();
      if (playWithComputer && !isWinner && count < 9) {
        setTimeout(computerMove, 500); // Introducing a delay for the computer move
      } else if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
};

const playVsHuman = () => {
  playWithComputer = false;
  alert("you are playing vs human");
  playWithHumanBtn.disabled = true;
  playWithComputerBtn.disabled = true;
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO && !playWithComputer) {
        // PlayerO
        box.innerText = "O";
        turnO = false;
      } else if (!turnO && !playWithComputer) {
        // PlayerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();
      if (!playWithComputer && !isWinner && count < 9) {
        // No need for computer move if playing with human
      } else if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
};

playWithHumanBtn.addEventListener("click", playVsHuman);

playWithComputerBtn.addEventListener("click", playVsComputer);

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Update the event listener for new game button
newGameBtn.addEventListener("click", () => {
  resetGame();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});
