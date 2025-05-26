const chessboard = document.createElement('div');
chessboard.id = 'chessboard';
chessboard.style.display = 'flex';
chessboard.style.flexDirection = 'column';
chessboard.style.justifyContent = 'center';
chessboard.style.alignItems = 'center';
chessboard.style.height = '450px';

for (let i = 0; i < 8; i++) {
  const row = document.createElement('div');
  row.style.display = 'flex';
  
  for (let j = 0; j < 8; j++) {
    const cell = document.createElement('div');
    cell.style.width = '50px';
    cell.style.height = '50px';
    cell.style.backgroundColor = (i + j) % 2 === 0 ? 'white' : 'black';
    cell.style.border = '1px solid black';
    row.appendChild(cell);
  }
  
  chessboard.appendChild(row);
}

document.body.appendChild(chessboard);
