// GameState.js
export const gameState = {
    player: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        speed: 5,
        velocityY: 0,
        gravity: 0.7,
        jumpStrength: -18,
        onGround: false,
        image: new Image(),
        jumpImage: new Image(),
        runImages: [new Image(), new Image()],
        currentRunImageIndex: 0,
        animationTime: 0,
        animationFrameDuration: 100,
        facingDirection: 'right'
    },
    keys: {
        right: false,
        left: false,
        jump: false
    },
    background: new Image(),
    groundHeight: 100
};

// Load images
export const loadImages = () => {
    gameState.player.image.src = 'images.png';
    gameState.player.jumpImage.src = 'mario_jump.png';
    gameState.player.runImages[0].src = 'images.png';
    gameState.player.runImages[1].src = 'mario_run1.png';
    gameState.background.src = 'background.png';
};
