// Player.js
import { gameState } from 'GameState';

export const updatePlayer = (deltaTime) => {
    // Apply gravity
    if (!gameState.player.onGround) {
        gameState.player.velocityY += gameState.player.gravity;
    }

    // Update player vertical position
    gameState.player.y += gameState.player.velocityY;

    const groundY = canvas.height - gameState.groundHeight;
    if (gameState.player.y + gameState.player.height >= groundY) {
        gameState.player.y = groundY - gameState.player.height;
        gameState.player.onGround = true;
        gameState.player.velocityY = 0;
    } else {
        gameState.player.onGround = false;
    }

    // Move the player based on key presses
    if (gameState.keys.right) {
        gameState.player.x += gameState.player.speed;
        gameState.player.facingDirection = 'right';
        updateRunningAnimation(deltaTime);
    } else if (gameState.keys.left) {
        gameState.player.x -= gameState.player.speed;
        gameState.player.facingDirection = 'left';
        updateRunningAnimation(deltaTime);
    } else {
        gameState.player.currentRunImageIndex = 0;
    }

    // Boundary checks
    if (gameState.player.x < 0) {
        gameState.player.x = 0;
    } else if (gameState.player.x + gameState.player.width > canvas.width) {
        gameState.player.x = canvas.width - gameState.player.width;
    }
};

const updateRunningAnimation = (deltaTime) => {
    gameState.player.animationTime += deltaTime;
    if (gameState.player.animationTime >= gameState.player.animationFrameDuration) {
        gameState.player.currentRunImageIndex = (gameState.player.currentRunImageIndex + 1) % gameState.player.runImages.length;
        gameState.player.animationTime = 0;
    }
};
