let container = document.querySelector('#container');
let button = document.querySelector('#newGrid');

let size = 16;

drawGrid(size);

button.addEventListener('click', () => {
    size = Number(window.prompt('Enter a new size for the grid', `${size}`));
    if(size>128){
        size = 64;
        alert(`${size} is bigger than the maximum supported size 128. Defaulting to 64`);
    }
    if(size){ // if a number has been inputted
        deleteGrid(); // delete all the children from the container
    }
    drawGrid(size); // draw the new grid
});

function drawGrid(size){
    for(let i = 0; i < size*size; i++){
        let div = document.createElement('div');
        div.style.flex = `1 0 calc(100%/${size})` // set flex basis(width) equal for every div
        container.appendChild(div);
    }
}

function deleteGrid(){
    container.replaceChildren();
}

let R = G = B = 0;

container.addEventListener('mouseover', (e) => {
    R = Math.floor(Math.random() * 256);
    G = Math.floor(Math.random() * 256);
    B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    e.stopPropagation();
});