window.addEventListener("load", ()=>{
    /* Global Variables */
    const gridWidth = 10;
    const gridHeight = 20;
    let gridBackend = [];
    let currentRotation = 0;
    let currentTetrominoIndex = 0;
    let currentBlock;

    /* Designin default tetrominoes */
    const tTetromino = [
        [0, 1, 2, 11],
        [1, 10, 11, 21],
        [1, 10, 11, 12],
        [1, 11, 12, 21],
    ];
    const lTetromino = [
        [0, 10, 20, 21],
        [0, 1, 2, 10],
        [0, 1, 11, 21],
        [2, 10, 11, 12],
    ];
    const zTetromino = [
        [0, 10, 11, 21],
        [1, 2, 10, 11],
        [0, 10, 11, 21],
        [1, 2, 10, 11],
    ];
    const oTetromino = [
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
    ];
    const iTetromino = [
        [0, 10, 20, 30],
        [0, 1, 2, 3],
        [0, 10, 20, 30],
        [0, 1, 2, 3],
    ];
    const tetrominos = [
        tTetromino, lTetromino, zTetromino, oTetromino, iTetromino,
    ];


    const generateNewBlock = () => {
	currentTetrominoIndex = Math.floor(Math.random() * 100) % 4;
        currentRotation = Math.floor(Math.random() * 100) % 4;
        currentBlock = tetrominos[currentTetrominoIndex][currentRotation];
        //currentBlock = tetrominos[4][0];
    }

    /* Defining Grid backend */
    const resetGridBackend = () => {
        for(let i = 0; i <gridHeight * gridWidth; i++){
            gridBackend[i] = false;
        }
    }
    
    const renderCurrentBlock = () => {
        currentBlock.forEach(index=>{
            gridBackend[index] = true;
        })    
    };

    /* Rendering Grid*/
    const renderGrid = () => {
        renderCurrentBlock();
        let gridDisplay = document.querySelector(".gamescreen__grid");
        gridDisplay.innerHTML = "";
        for(let i = 0; i < gridHeight; i++){
            let content = "";
            content+=`<div class="gamescreen__gridRow">`;
            for(let j = 0; j < gridWidth; j++){
                if(gridBackend[i*gridWidth+j] == true){
                    content+=`<div class="gamescreen__gridBox gamescreen__gridBox--filled"></div>`;
                }else{
                    content+=`<div class="gamescreen__gridBox"></div>`;
                }
            }
            content+=`</div>`;
            gridDisplay.innerHTML+=content;
        }
    };
        
    
    /* Moving Functions */
    const moveLeft = () => {
        for(let i = 0; i < 4; i++){
            if(currentBlock[i] % 10 === 0){
                return;
            }
        }
        for(let i = 0; i < 4; i++){
            currentBlock[i]--;
        }
    };
    const moveRight = () => {
        for(let i = 0; i < 4; i++){
            if(currentBlock[i] % 10 === 9){
                return;
            }
        }
        for(let i = 0; i < 4; i++){
            currentBlock[i]++;
        }
    };
    const moveDown = () =>{
        for(let i = 0; i < 4; i++){
            currentBlock[i]+=10;
        }
    }
    const rotate = () => {
	if(currentRotation == 3){
		currentRotation=0;
	}else{
		currentRotation++;
	}
        currentBlock = tetrominos[currentTetrominoIndex][currentRotation];
	console.log("rotating");
    }


    /* Arrow key listeners */
    document.addEventListener("keydown", e=>{
        if(e.key == "ArrowLeft"){
            moveLeft();
        }
        if(e.key == "ArrowRight"){
            moveRight();
        }
        if(e.key == "Space" || e.key == "ArrowUp"){
            rotate();
        }
    });

    const gameLoop = () => {
        console.log("hello");
        resetGridBackend();
        renderGrid();
        moveDown();
        setTimeout(gameLoop, 1000);
    }
    
    generateNewBlock();
    gameLoop();
});
