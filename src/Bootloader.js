class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.video('fondo', './FondoAnimado.mp4');
        //this.load.image('background', './Fondo.webp');
        this.load.image('startButton', './start.png');
        

        this.load.on('complete', () => {
            console.log('Load complete');
        });
    }

    create() {
        
        // Obtener las dimensiones de la ventana del juego
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
    
        // Agregar el video de fondo con el tamaño de la ventana del juego
        const backgroundVideo = this.add.video(gameWidth / 2, gameHeight / 2, 'fondo').setScale(0.42, 0.6);
    
        // Reproducir el video en bucle
        backgroundVideo.play(true);
    
        // Agregar la imagen como botón de "Start"
        const startButton = this.add.image(400, 340, 'startButton')
            .setOrigin(0.5)
            .setScale(0.2) // Escalar la imagen a la mitad del tamaño original
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Tutorial');
            });
    }
    

}
export default Bootloader;