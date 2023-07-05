let container = document.querySelector('#container');

let x = 16, y = 16;

for(let i = 0; i < x*y; i++){
    let div = document.createElement('div');
    container.appendChild(div);
}