const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let items = [];
let score = 0;

function createItem() {
    const item = {
        x: Math.random() * canvas.width,
        y: 0,
        width: 20,
        height: 20,
        speed: 2
    };
    items.push(item);
}

function update() {
    items.forEach(item => {
        item.y += item.speed;
        if (item.y > canvas.height) {
            items = items.filter(i => i !== item);
            createItem();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach(item => {
        ctx.fillStyle = 'red';
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    items.forEach(item => {
        if (x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height) {
            items = items.filter(i => i !== item);
            score += 10;
            createItem();
        }
    });
});

createItem();
gameLoop();
