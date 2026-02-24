// ================= GLOBAL VARIABLES =================
let game = null;
let board = null;
let selectedColor = "white";

const levels = [
    "1 - Beginner",
    "2 - Easy",
    "3 - Middle",
    "4 - Hard",
    "5 - Advanced",
    "6 - Expert",
    "7 - Candidate",
    "8 - Master",
    "9 - Grand Master",
    "10 - Champion"
];


// ================= SAFE PLAY SOUND FUNCTION =================
function playSound(id) {
    const sound = document.getElementById(id);
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;

    const playPromise = sound.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {});
    }
}


// ================= HOME PAGE =================
function goComputer() {
    window.location.href = "play-computer.html";
}


// ================= SELECT COLOR =================
function selectColor(event, color) {
    selectedColor = color;

    document.querySelectorAll(".color-box").forEach(box => {
        box.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
}


// ================= DIFFICULTY SLIDER =================
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("difficultySlider");
    const levelName = document.getElementById("levelName");

    if (slider) {
        slider.addEventListener("input", function () {
            levelName.textContent = levels[this.value - 1];
        });
    }
});


// ================= START GAME =================
function startGame() {

    const difficulty = document.getElementById("difficultySlider").value;

    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("levelName", levels[difficulty - 1]);
    localStorage.setItem("color", selectedColor);

    window.location.href = "game.html";
}


// ================= GAME PAGE =================
document.addEventListener("DOMContentLoaded", function () {

    if (!document.getElementById("board")) return;

    const levelName = localStorage.getItem("levelName");
    const color = localStorage.getItem("color") || "white";

    document.getElementById("levelTitle").innerText = levelName;

    game = new Chess();

    function onDragStart(source, piece) {
        if (game.game_over()) return false;

        if (color === "white" && piece.search(/^b/) !== -1) return false;
        if (color === "black" && piece.search(/^w/) !== -1) return false;
    }

    function onDrop(source, target) {

        const move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        // 🔊 PLAYER SOUND
        if (move.captured) {
            playSound("captureSound");
        } else {
            playSound("moveSound");
        }

        updateCaptured(move);
        board.position(game.fen());

        checkGameOver();

        if (!game.game_over()) {
            setTimeout(makeComputerMove, 500);
        }
    }

    board = Chessboard('board', {
        draggable: true,
        position: 'start',
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop
    });

    // If player chooses black → computer starts
    if (color === "black") {
        setTimeout(makeComputerMove, 500);
    }
});


// ================= COMPUTER MOVE =================
function makeComputerMove() {

    if (!game || game.game_over()) return;

    const moves = game.moves();
    if (moves.length === 0) return;

    const move = game.move(
        moves[Math.floor(Math.random() * moves.length)]
    );

    // 🔊 COMPUTER SOUND
    if (move.captured) {
        playSound("captureSound");
    } else {
        playSound("moveSound");
    }

    updateCaptured(move);
    board.position(game.fen());

    checkGameOver();
}


// ================= CAPTURE DISPLAY =================
function updateCaptured(move) {

    if (!move.captured) return;

    const img = document.createElement("img");

    img.src = `https://chessboardjs.com/img/chesspieces/wikipedia/${
        move.color === "w" ? "b" : "w"
    }${move.captured}.png`;

    if (move.color === "w") {
        document.getElementById("computerCaptured").appendChild(img);
    } else {
        document.getElementById("playerCaptured").appendChild(img);
    }
}



// ================= CHECK GAME OVER =================
// ================= CHECK GAME OVER =================
function checkGameOver() {

    if (!game) return;

    const isMate =
        (game.in_checkmate && game.in_checkmate()) ||
        (game.isCheckmate && game.isCheckmate());

    if (isMate) {

        let winner;

        if (game.turn() === "w") {
            winner = "🤖 Computer Wins!";
        } else {
            winner = "🎉 You Win!";
        }

        const modal = document.getElementById("winModal");
        const winnerText = document.getElementById("winnerText");

        if (winnerText) winnerText.innerText = winner;
        if (modal) modal.style.display = "flex";

        // 🔥 Play CHECKMATE sound first
        playSound("checkmateSound");

        // 🔥 Then after 1 second play win sound
        setTimeout(() => {
            playSound("winSound");
        }, 1000);
    }
}


// ================= PLAY AGAIN =================
function playAgain() {
    window.location.reload();
}


// ================= QUIT =================
function quitGame() {
    window.location.href = "index.html";
}