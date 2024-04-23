// Variables
let canvas;
let ctx;
let playerImg = new Image();
let obstacleImg = new Image();
let trophyImg = new Image();
let backgroundMusic; // Variable para la música de fondo
let playerY = 180;
let obstacleX = 400;
let obstacleY = 200;
let obstacleSpeed = 5;
let score = 0;
let trophies = 0;
let gameOver = false;

// Función principal
function main() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Definir color de fondo del lienzo
    ctx.fillStyle = '#FFE4E1'; // Color rosa claro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cargar imágenes
    playerImg.src = 'player.png';
    obstacleImg.src = 'obstacle.png';
    trophyImg.src = 'trophy.png';
    
    // Obtener referencia al elemento de audio
    backgroundMusic = document.getElementById('backgroundMusic');

    canvas.addEventListener('touchstart', handleTouchStart);
    setInterval(gameLoop, 1000/60);
}

// Bucle principal del juego
function gameLoop() {
    if (!gameOver) {
        update();
        draw();
    }
}

// Actualizar lógica del juego
function update() {
    obstacleX -= obstacleSpeed;
    if (obstacleX < 0) {
        obstacleX = canvas.width;
        obstacleY = Math.random() * canvas.height;
        score++;
    }

    // Comprobar si se ha alcanzado un múltiplo de 10 puntos para agregar un trofeo
    if (score > 0 && score % 10 === 0 && trophies === 0) {
        trophies++;
    }

    if (checkCollision()) {
        gameOver = true;
        backgroundMusic.pause(); // Pausar la música de fondo cuando el juego termina
    }
}

// Dibujar en el lienzo
function draw() {
    // Limpiar el lienzo y dibujar el color de fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFE4E1'; // Color rosa claro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar jugador y obstáculos
    ctx.drawImage(playerImg, canvas.width / 2 - 20, playerY, 40, 40); // Ajustar el tamaño del jugador
    ctx.drawImage(obstacleImg, obstacleX, obstacleY, 50, 50); // Ajustar el tamaño de los obstáculos

    // Dibujar trofeo
    if (trophies > 0) {
        ctx.drawImage(trophyImg, 10, 10, 50, 50); // Ajustar tamaño del trofeo
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('x ' + trophies, 70, 45); // Mostrar cantidad de trofeos al lado de la imagen
    }

    // Dibujar puntuación
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 90); // Ajustar posición de la puntuación

    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Manejar eventos de toque
function handleTouchStart(event) {
    let touchY = event.touches[0].clientY;
    playerY = touchY - 20; // Ajustar la posición del jugador para centrar mejor el toque
}

// Detectar colisión
function checkCollision() {
    return (
        (canvas.width / 2 - 20) < obstacleX + 50 &&
        (canvas.width / 2 + 20) > obstacleX &&
        playerY < obstacleY + 50 &&
        playerY + 40 > obstacleY
    );
}

// Iniciar el juego
main();
