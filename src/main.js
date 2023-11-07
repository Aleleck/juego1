import Bootloader from './Bootloader.js';
import Correcto from './scenes/correcto.js';
import GameOverScene from './scenes/gameOver.js';
import GameScene from './scenes/gameScene.js';
import Tutorial from './scenes/tutorial.js';

const config = {
    title: "Fracciones",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        
    },
    
    pixelArt: true,
    scene: [
        Bootloader,
        GameScene,
        Correcto,
        Tutorial,
        GameOverScene,
    ]
};

new Phaser.Game(config);