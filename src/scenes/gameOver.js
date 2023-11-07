export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        // Puedes mostrar un mensaje de game over
        const gameOverText = this.add.text(400, 300, '¡Game Over!', { fontSize: '48px', fill: 'red' });
        gameOverText.setOrigin(0.5);

        // Agrega un botón para volver al menú principal o volver a intentar
        const backButton = this.add.text(400, 400, 'Volver al Menú', { fontSize: '24px', fill: 'blue' });
        backButton.setOrigin(0.5);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('Bootloader'); // Reemplaza 'Bootloader' con el nombre de tu escena principal
        });
    }
}
