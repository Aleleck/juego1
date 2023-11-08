export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload(){
        this.add.image('over', 'assets/gameOver.png')
    }

    create() {
        
        const backgroundCorrecto = this.add.image(400, 300, 'over').setScale(0.42, 0.56);

        // Agrega un botón para volver al menú principal o volver a intentar
        const backButton = this.add.text(400, 400, 'Volver al Menú', { fontSize: '24px', fill: 'blue' });
        backButton.setOrigin(0.5);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('Bootloader'); // Reemplaza 'Bootloader' con el nombre de tu escena principal
        });
    }
}
