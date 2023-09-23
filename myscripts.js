let container = document.querySelector('#container');
let newGridButton = document.querySelector('#newGrid');
let clearGridButton = document.querySelector('#clearGrid');
let rgbModeButton = document.querySelector('#rgbMode');
let bnwModeButton = document.querySelector('#bnwMode');

let size = 4;
drawModeRGB = true;
drawGrid(size);

newGridButton.addEventListener('click', () => {
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

clearGridButton.addEventListener('click', clearGrid);

rgbModeButton.addEventListener('click', () => {
    if(!drawModeRGB){
        clearGrid();// clear grid
        drawModeRGB = true;
    }
});

bnwModeButton.addEventListener('click', () => {
    if(drawModeRGB){
        clearGrid();// clear grid
        drawModeRGB = false;
    }
});

function clearGrid(){
    let children = container.childNodes;
    children.forEach((div) => div.style.backgroundColor = `rgb(255, 255, 255)`);
}

function drawGrid(size){
    for(let i = 0; i < size*size; i++){
        let div = document.createElement('div');
        div.style.flex = `1 0 calc(100%/${size})` // set flex basis(width) equal for every div
        div.style.backgroundColor = `rgb(255, 255, 255)`;
        container.appendChild(div);
    }
}

function deleteGrid(){
    container.replaceChildren();
}

container.addEventListener('mouseover', (e) => {
    e.target.style.backgroundColor = draw(drawModeRGB, e);
    e.stopPropagation();
});

let R = G = B = 0;

function draw(rgb, e){
    if(rgb){
        R = Math.floor(Math.random() * 256);
        G = Math.floor(Math.random() * 256);
        B = Math.floor(Math.random() * 256);
    } else{
        let color = e.target.style.backgroundColor;

        color = color.split(','); // extract the individual RGB colors
        R = +color[0].replace(/[^0-9]/g, ''); // replace non digits with empty string
        G = +color[1].replace(/[^0-9]/g, ''); // essentialy deletes non digits
        B = +color[2].replace(/[^0-9]/g, '');
          
        console.log(`R ${R}, G ${G}, B ${B}`);

        R = R - 255/10;
        G = G - 255/10;
        B = B - 255/10;

        if(R<0, G<0, B<0){
            R = G = B = 0;
        }
    }
    return `rgb(${R}, ${G}, ${B})`;
}