// Canvas.js
import { gameState } from 'GameState';

export const render = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(gameState.background, 0, 0, context.canvas.width, context.canvas.height);

    context.save();
    const currentImage = gameState.player.onGround ? gameState.player.runImages[gameState.player.currentRunImageIndex] : gameState.player.jumpImage;

    if (gameState.player.facingDirection === 'left') {
        context.scale(-1, 1);
        context.drawImage(currentImage, -gameState.player.x - gameState.player.width, gameState.player.y, gameState.player.width, gameState.player.height);
    } else {
        context.drawImage(currentImage, gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);
    }
    context.restore();
};
