const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let lastTime = 0;
const gameState = {
    player: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        speed: 5,
        velocityY: 0,
        gravity: 0.7,
        jumpStrength: -14,
        onGround: false,
        image: new Image(), // Standing image
        jumpImage: new Image(), // Jumping image
        runImages: [new Image(), new Image()], // Running images
        currentRunImageIndex: 0,
        animationTime: 0,
        animationFrameDuration: 100, // Time in milliseconds per frame
        facingDirection: 'right' // Track the facing direction
    },
    keys: {
        right: false,
        left: false,
        jump: false
    },
    background: new Image(), // Background image
    groundHeight: 100 // Height of the ground platform
};

// Load the player images
gameState.player.image.src = 'images.png'; // Replace with your standing image path
gameState.player.jumpImage.src = 'mario_jump.png'; // Replace with your jumping image path
gameState.player.runImages[0].src = 'images.png'; // Replace with your running image 1 path
gameState.player.runImages[1].src = 'mario_run1.png'; // Replace with your running image 2 path

// Load the background image
gameState.background.src = 'background.png'; // Replace with your background image path

// Initialize your game
function init() {
    // Set up initial game state, preload assets, etc.
}

// Update your game logic
function update(deltaTime) {
    // Apply gravity
    if (!gameState.player.onGround) {
        gameState.player.velocityY += gameState.player.gravity;
    }

    // Update player vertical position
    gameState.player.y += gameState.player.velocityY;

    // Check for ground collision
    const groundY = canvas.height - gameState.groundHeight; // Calculate ground level
    if (gameState.player.y + gameState.player.height >= groundY) {
        gameState.player.y = groundY - gameState.player.height; // Reset to ground level
        gameState.player.onGround = true;
        gameState.player.velocityY = 0; // Reset vertical velocity
    } else {
        gameState.player.onGround = false;
    }

    // Move the player horizontally based on key presses
    if (gameState.keys.right) {
        gameState.player.x += gameState.player.speed;
        gameState.player.facingDirection = 'right'; // Update direction
        updateRunningAnimation(deltaTime);
    } else if (gameState.keys.left) {
        gameState.player.x -= gameState.player.speed;
        gameState.player.facingDirection = 'left'; // Update direction
        updateRunningAnimation(deltaTime);
    } else {
        gameState.player.currentRunImageIndex = 0; // Reset to the first frame when not running
    }

    // Reset position if it goes off canvas
    if (gameState.player.x > canvas.width) {
        gameState.player.x = 0;
    } else if (gameState.player.x < 0) {
        gameState.player.x = canvas.width - gameState.player.width;
    }
}

// Update the running animation frame
function updateRunningAnimation(deltaTime) {
    gameState.player.animationTime += deltaTime;
    if (gameState.player.animationTime >= gameState.player.animationFrameDuration) {
        gameState.player.currentRunImageIndex = (gameState.player.currentRunImageIndex + 1) % gameState.player.runImages.length;
        gameState.player.animationTime = 0; // Reset the animation timer
    }
}

// Render the game
function render() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the background image
    context.drawImage(gameState.background, 0, 0, canvas.width, canvas.height);
    
    // Save the current context
    context.save();
    
    // Choose the appropriate image based on jump state
    const currentImage = gameState.player.onGround ? gameState.player.runImages[gameState.player.currentRunImageIndex] : gameState.player.jumpImage;

    // Flip the image if moving left
    if (gameState.player.facingDirection === 'left') {
        context.scale(-1, 1); // Flip horizontally
        context.drawImage(currentImage, -gameState.player.x - gameState.player.width, gameState.player.y, gameState.player.width, gameState.player.height);
    } else {
        context.drawImage(currentImage, gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);
    }
    
    // Restore the context to its original state
    context.restore();
}

// The main game loop
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    render();

    requestAnimationFrame(gameLoop);
}

// Handle keyboard input
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            gameState.keys.right = true; // Move right
            break;
        case 'ArrowLeft':
            gameState.keys.left = true; // Move left
            break;
        case ' ':
            if (gameState.player.onGround) { // Space bar for jump
                gameState.player.velocityY = gameState.player.jumpStrength; // Apply jump strength
                gameState.player.onGround = false; // Set to false since player is in the air
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            gameState.keys.right = false; // Stop moving right
            break;
        case 'ArrowLeft':
            gameState.keys.left = false; // Stop moving left
            break;
    }
});

// Start the game
init();
requestAnimationFrame(gameLoop);
