export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload(){
        this.load.image('over', 'assets/gameOver.png');
        this.load.image('puntero', './puntero.png');
    }

    create() {
        this.input.setDefaultCursor('url("assets/puntero.png"), pointer');
        this.add.image(400, 300, 'over').setScale(0.42, 0.56).setDepth(2);

        // Agrega un botón para volver al menú principal o volver a intentar
        const backButton = this.add.text(515, 375, '.......', { fontSize: '24px', fill: 'blue' });
        backButton.setOrigin(0.5);
        backButton.setInteractive();
        backButton.setDepth(1);
        backButton.on('pointerdown', () => {
            this.scene.start('Bootloader'); // Reemplaza 'Bootloader' con el nombre de tu escena principal
        });

        const backButton2 = this.add.text(315, 375, '.......', { fontSize: '24px', fill: 'blue' });
        backButton2.setOrigin(0.5);
        backButton2.setInteractive();
        backButton.setDepth(1);
        backButton2.on('pointerdown', () => {
            this.scene.start('GameScene'); // Reemplaza 'Bootloader' con el nombre de tu escena principal
        });
    }
}
