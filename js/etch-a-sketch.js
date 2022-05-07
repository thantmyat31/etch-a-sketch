const container = document.querySelector('.container');
let grid = 16;
let color = '#b2f1b2';
let isRainbow = false;
let isMixed = false;
let gridItems;

function getWidth(grid) {
    return container.clientWidth / grid;
}
function getHeight(grid) {
    return container.clientHeight / grid;
}

function createAndAppendGrid({grid, width, height}) {
    for(let i = 0; i < grid * grid; i++) {
        let div = document.createElement('div');
        div.classList.add('grid');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        container.appendChild(div);
    }
    gridItems = document.querySelectorAll('.grid');
    addEventHandler(gridItems);
}

function addEventHandler(items) {
    items.forEach(function(item) {
        item.addEventListener('mouseover', function(e) {
            if(!isRainbow && !isMixed) {
                this.style.background = color;
            } else {
                if(isRainbow) {
                    this.style.background = `linear-gradient(145deg, ${createRandomColor()}, ${createRandomColor()}, ${createRandomColor()})`;
                } else {
                    this.style.background = createRandomColor();
                }
            }
             
        });
    });
}

function createRandomNumber() {
    return Math.floor(Math.random() * 256);
}

function createRandomColor() {
    return `rgb(${createRandomNumber()}, ${createRandomNumber()}, ${createRandomNumber()})`;
}

function clearAllGridItems() {
    gridItems.forEach(function(item) {
        item.style.background = 'white';
    });
}

const modes = document.querySelectorAll('.btn-mode');
modes.forEach(function(mode) {
    mode.addEventListener('click', function(e) {
        e.preventDefault();
        isRainbow = false;
        isMixed = false;
        if(this.classList.contains('btn-black')) color = 'black';
        if(this.classList.contains('btn-default')) color = '#b2f1b2';
        if(this.classList.contains('btn-rainbow')) isRainbow = true;
        if(this.classList.contains('btn-mixed')) isMixed = true;

        handleActiveClass(e, '.btn-mode');
    });
});

document.querySelector('.btn-clear').addEventListener('click', clearAllGridItems);

const btnGrids = document.querySelectorAll('.btn-grid');
btnGrids.forEach(function(btnGrid) {
    btnGrid.addEventListener('click', function(e) {
        e.preventDefault();
        container.innerHTML = '';
        const grid = e.target.dataset.size;

        
        createAndAppendGrid({ grid , width: getWidth(grid)  , height: getHeight(grid)});
        handleActiveClass(e, '.btn-grid');
    })
})

function handleActiveClass(e, classname) {
    if (document.querySelector(`${classname}.active`) !== null) {
        document.querySelector(`${classname}.active`).classList.remove('active');
    }
    e.target.classList.add('active');
}
createAndAppendGrid({grid, width: getWidth(grid), height: getHeight(grid)});

