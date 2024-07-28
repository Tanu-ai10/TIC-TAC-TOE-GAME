const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const winConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) 
{
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) 
        {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        resetGame();
        return;
    } else if (isDraw()) 
    {
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') 
    {
        aiMove();
    }
}

function checkWin(player) 
{
    return winConditions.some(condition => 
    {
        return condition.every(index => 
        {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() 
{
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function aiMove() 
{
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < cells.length; i++)
    {
        if (cells[i].textContent === '') 
        {
            cells[i].textContent = 'O';
            let score = minimax(cells, 0, false);
            cells[i].textContent = '';
            if (score > bestScore) 
            {
                bestScore = score;
                move = i;
            }
        }
    }
    cells[move].textContent = 'O';
    if (checkWin('O')) 
    {
        setTimeout(() => alert('O wins!'), 100);
        resetGame();
    } 
    else if (isDraw()) 
    {
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
    } 
    else 
    {
        currentPlayer = 'X';
    }
}

const scores = {
    X: -1,
    O: 1,
    draw: 0
};

function minimax(cells, depth, isMaximizing) 
{
    let result = checkWinner();
    if (result !== null) 
    {
        return scores[result];
    }

    if (isMaximizing) 
    {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) 
        {
            if (cells[i].textContent === '') 
            {
                cells[i].textContent = 'O';
                let score = minimax(cells, depth + 1, false);
                cells[i].textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } 
    else 
    {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) 
        {
            if (cells[i].textContent === '') 
            {
                cells[i].textContent = 'X';
                let score = minimax(cells, depth + 1, true);
                cells[i].textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner()
{
    for (let condition of winConditions)
    {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) 
        {
            return cells[a].textContent;
        }
    }

    if (isDraw()) 
    {
        return 'draw';
    }
    return null;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
