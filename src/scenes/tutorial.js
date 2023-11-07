class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        
        this.load.video('video', 'assets/Tutorial.mp4');
        this.load.image('pausa', 'assets/pausa.webp');
        this.load.image('play', 'assets/play1.webp');
        this.load.image('comenzar', 'assets/comenzar.png');
        this.load.on('complete', () => {
        console.log('Load complete');
        });
    }

    create() {

        // Obtener las dimensiones de la ventana del juego
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Agregar el video de fondo con el tamaño de la ventana del juego
        const backgroundVideo = this.add.video(gameWidth / 2, gameHeight / 2, 'video').setScale(0.42, 0.6);

        // Reproducir el video en bucle
        backgroundVideo.play(true);

        const pauseButton = this.add.image(330, 550, 'pausa')
            .setOrigin(0.5)
            .setScale(0.2) // Escalar la imagen a la mitad del tamaño original
            .setInteractive()
            .on('pointerdown', () => {
                backgroundVideo.pause(true);
            });
        const playButton = this.add.image(460, 550, 'play')
            .setOrigin(0.5)
            .setScale(0.2) // Escalar la imagen a la mitad del tamaño original
            .setInteractive()
            .on('pointerdown', () => {
                backgroundVideo.resume();
            });    
        const comenzar = this.add.image(400, 545, 'comenzar')
            .setOrigin(0.5)
            .setScale(0.3) // Escalar la imagen a la mitad del tamaño original
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

    }


}
export default Tutorial;