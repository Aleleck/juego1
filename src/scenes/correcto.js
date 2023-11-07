class Correcto extends Phaser.Scene {
    constructor() {
        super('Correcto');
    }

    preload() {
        
        this.load.image('fondo1','assets/correcto.png');
        this.load.image('boton', 'assets/siguiente.png');
    }

    create() {
        
        const backgroundCorrecto = this.add.image(400, 300, 'fondo1').setScale(0.42, 0.56);

        const startButton = this.add.image(400, 340, 'boton')
            .setOrigin(0.5)
            .setScale(0.5) // Escalar la imagen a la mitad del tamaño original
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });
    }
    

}
export default Correcto;