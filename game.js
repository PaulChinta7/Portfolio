<<<<<<< HEAD
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

    // Check boundaries to prevent the player from going out of canvas
    if (gameState.player.x < 0) {
        gameState.player.x = 0; // Prevent going left
    } else if (gameState.player.x + gameState.player.width > canvas.width) {
        gameState.player.x = canvas.width - gameState.player.width; // Prevent going right
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
        case 'ArrowUp':
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
=======
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let isPaused = false;
let lastTime = 0;
const gameState = {
    player: {
        x: 250,
        y: 150,
        width: 50,
        height: 50,
        speed: 5,
        velocityY: 0,
        gravity: 0.7,
        jumpStrength: -18,
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
    groundHeight: 100, // Height of the ground platform
    blocks: [
        { x: 480, y: 550, width: 60, height: 50 },
        { x: 1140, y: 550, width: 120, height: 50 },
        { x: 120, y: 550, width: 60, height: 50 },
        { x: 660, y: 350, width: 180, height: 50 },
        { x: 1080, y: 350, width: 240, height: 50 },
        { x: 1440, y: 700, width: 60, height: 50 },
        { x: 1500, y: 650, width: 60, height: 100 },
        { x: 1560, y: 600, width: 60, height: 150 },
        { x: 1620, y: 550, width: 60, height: 200 }
       
    ] // Example blocks
};


function onHitBlock() {
    console.log("Player hit the block from below!");

    if (!isPaused) { // Only act if not already paused
        isPaused = true; // Set the pause state to true
    setTimeout(() => {
        window.open('https://github.com/PaulChinta7', '_blank');
        isPaused = false;// Replace with your desired URL
    }, 1000); // 1000 milliseconds = 3 seconds
}
    // You can add any additional logic here, like playing a sound or updating score.
}

// Load the player images
gameState.player.image.src = 'images.png';
gameState.player.jumpImage.src = 'mario_jump.png';
gameState.player.runImages[0].src = 'images.png';
gameState.player.runImages[1].src = 'mario_run1.png';

// Load the background image
gameState.background.src = 'background.png';

// Initialize your game
function init() {
    // Set up initial game state, preload assets, etc.
}

// Function to check collisions
function checkCollisions() {
    const groundY = canvas.height - gameState.groundHeight;

    // Check collision with ground
    if (gameState.player.y + gameState.player.height >= groundY) {
        gameState.player.y = groundY - gameState.player.height;
        gameState.player.onGround = true;
        gameState.player.velocityY = 0;
    } else {
        gameState.player.onGround = false;
    }

    // Check collisions with blocks
    gameState.blocks.forEach(block => {
        if (
            gameState.player.x < block.x + block.width &&
            gameState.player.x + gameState.player.width > block.x &&
            gameState.player.y < block.y + block.height &&
            gameState.player.y + gameState.player.height > block.y
        ) {
            // Collision detected
            if (gameState.player.velocityY > 0) { // Player is falling
                // Place player on top of the block
                gameState.player.y = block.y - gameState.player.height;
                gameState.player.onGround = true;
                gameState.player.velocityY = 0; // Reset vertical velocity
                gameState.player.currentRunImageIndex = 0; 

       
                

            } else if (gameState.player.velocityY < 0) { // Player is jumping up
                // Place player below the block
                gameState.player.y = block.y + block.height; // Position player below the block
                gameState.player.velocityY = 0; // Reset vertical velocity
                onHitBlock();
            } else if (gameState.player.velocityY === 0) {
                // Player is moving horizontally
                if (gameState.player.x + gameState.player.width > block.x && gameState.player.x < block.x) {
                    // Player is moving right into the block
                    gameState.player.x = block.x - gameState.player.width; // Place player to the left of the block
                } else if (gameState.player.x < block.x + block.width && gameState.player.x + gameState.player.width > block.x + block.width) {
                    // Player is moving left into the block
                    gameState.player.x = block.x + block.width; // Place player to the right of the block
                }
            }
        }
    });
}

function update(deltaTime) {
    // Apply gravity
    if (!gameState.player.onGround) {
        gameState.player.velocityY += gameState.player.gravity;
    }

    // Update player vertical position
    gameState.player.y += gameState.player.velocityY;

    // Check for collisions
    checkCollisions();

    // Move the player horizontally based on key presses
    if (gameState.keys.right) {
        gameState.player.x += gameState.player.speed;
        gameState.player.facingDirection = 'right'; // Update direction
        if (gameState.player.onGround) {
            // Only update the animation if the player is on the ground 
            updateRunningAnimation(deltaTime);
        }
    } else if (gameState.keys.left) {
        gameState.player.x -= gameState.player.speed;
        gameState.player.facingDirection = 'left'; // Update direction
        if (gameState.player.onGround) {
            // Only update the animation if the player is on the ground
            updateRunningAnimation(deltaTime);
        }
    } else {
        // Reset to standing frame if not moving
        if (gameState.player.onGround) {
            gameState.player.currentRunImageIndex = 0; // Ensure standing frame
        }
    }

    // Check boundaries to prevent the player from going out of canvas
    if (gameState.player.x < 0) {
        gameState.player.x = 0; // Prevent going left
    } else if (gameState.player.x + gameState.player.width > canvas.width) {
        gameState.player.x = canvas.width - gameState.player.width; // Prevent going right
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

    // Draw the blocks
    gameState.blocks.forEach(block => {
        context.fillStyle = 'rgba(165, 42, 42, 0)'; // Block color
        context.fillRect(block.x, block.y, block.width, block.height);
    });

    // Save the current context
    context.save();

    // Choose the appropriate image based on jump state
    const currentImage = gameState.player.onGround? gameState.player.runImages[gameState.player.currentRunImageIndex] : gameState.player.jumpImage;

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
        case 'ArrowUp':
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
>>>>>>> master
