document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const result = document.querySelector('#result');
    const width = 4;
    let squares = [];
    let score = 0;

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generateNumbers();
        generateNumbers();
    }

    function generateNumbers() {
        const randomNum = Math.floor(Math.random() * squares.length);
        if (squares[randomNum].innerHTML == 0) {
            squares[randomNum].innerHTML = 2;
        } else {
            generateNumbers();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];
                let filtered = row.filter(num => num);
                let zeros = Array(4 - filtered.length).fill(0);
                let newRow = zeros.concat(filtered);
                for (let j = 0; j < 4; j++) squares[i + j].innerHTML = newRow[j];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];
                let filtered = row.filter(num => num);
                let zeros = Array(4 - filtered.length).fill(0);
                let newRow = filtered.concat(zeros);
                for (let j = 0; j < 4; j++) squares[i + j].innerHTML = newRow[j];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let col = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
            let filtered = col.filter(num => num);
            let zeros = Array(4 - filtered.length).fill(0);
            let newCol = filtered.concat(zeros);
            for (let j = 0; j < 4; j++) squares[i + width * j].innerHTML = newCol[j];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let col = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + width * 2].innerHTML),
                parseInt(squares[i + width * 3].innerHTML)
            ];
            let filtered = col.filter(num => num);
            let zeros = Array(4 - filtered.length).fill(0);
            let newCol = zeros.concat(filtered);
            for (let j = 0; j < 4; j++) squares[i + width * j].innerHTML = newCol[j];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = total;
                squares[i + 1].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function combineCol() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = total;
                squares[i + width].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function checkWin() {
        for (let square of squares) {
            if (square.innerHTML == 2048) {
                result.innerHTML = "🎉 YOU WIN!";
                clearInterval(myTimer);
                document.removeEventListener('keydown', control);
                return;
            }
        }
    }

    function checkLoss() {
        let hasEmpty = squares.some(square => square.innerHTML == 0);
        let canCombine = false;
        for (let i = 0; i < squares.length; i++) {
            if (
                (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1]?.innerHTML) ||
                (i < 12 && squares[i].innerHTML === squares[i + 4]?.innerHTML)
            ) {
                canCombine = true;
                break;
            }
        }
        if (!hasEmpty && !canCombine) {
            result.innerHTML = "💀 GAME OVER";
            clearInterval(myTimer);
            document.removeEventListener('keydown', control);
        }
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generateNumbers();
        checkWin();
        checkLoss();
    }

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generateNumbers();
        checkWin();
        checkLoss();
    }

    function keyUp() {
        moveUp();
        combineCol();
        moveUp();
        generateNumbers();
        checkWin();
        checkLoss();
    }

    function keyDown() {
        moveDown();
        combineCol();
        moveDown();
        generateNumbers();
        checkWin();
        checkLoss();
    }

    function control(e) {
        switch (e.key) {
            case 'ArrowLeft': keyLeft(); break;
            case 'ArrowRight': keyRight(); break;
            case 'ArrowUp': keyUp(); break;
            case 'ArrowDown': keyDown(); break;
        }
    }

    document.addEventListener('keydown', control);

    function addColors() {
        squares.forEach(square => {
            const value = parseInt(square.innerHTML);
            square.style.color = value > 4 ? 'white' : '#776e65';
            square.style.backgroundColor = {
                0: '#cdc1b4',
                2: '#eee4da',
                4: '#ede0c8',
                8: '#f2b179',
                16: '#f59563',
                32: '#f67c5f',
                64: '#f65e3b',
                128: '#edcf72',
                256: '#edcc61',
                512: '#edc850',
                1024: '#edc53f',
                2048: '#edc22e'
            }[value] || '#3c3a32';
        });
    }

    createBoard();
    const myTimer = setInterval(addColors, 100);
});
