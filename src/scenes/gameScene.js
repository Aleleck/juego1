let circle;
let sliceGraphics;
let lineGraphics;
let lineColor = 0xFF63D8; // Color de las líneas (puedes ajustar este valor)
//#585EFF
let selectedSlices = []; // Array para almacenar las particiones seleccionadas

let numeratorInput;
let denominatorInput;

let sliceCount = 0;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.numerador = 0;
        this.denominador = 0;
        this.intentos = 0;
    }
    preload() {
        this.load.setPath('../assets/');
        this.load.image('fondo', './GameF.jpg');
        this.load.image('atras', './atras.webp');
        this.load.image('verificar', './verif.png');
        this.load.image('incorrect', './incorrecto.gif');
    }
    create() {
        const backgroundImage = this.add.image(400, 300, 'fondo').setScale(0.42, 0.56);

        const backButton = this.add.image(700, 550, 'atras').setInteractive().setScale(0.3);
        const verificarButton = this.add.image(150, 560, 'verificar').setInteractive().setScale(0.4);
        // Generar números aleatorios para el numerador y el denominador
        const minNumber = 1; // El número mínimo permitido
        const maxNumber = 14; // El número máximo permitido (menor que 15)

        this.numerador = Phaser.Math.Between(minNumber, maxNumber);
        this.denominador = Phaser.Math.Between(this.numerador + 1, maxNumber); // Asegurarse de que el denominador sea mayor que el numerador

        // Mostrar los valores en la pantalla
        const numeradorText = this.add.text(120, 180, `${this.numerador}`, { fontSize: '50px', fill: 'black', fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 });
        const denominadorText = this.add.text(120, 400, `${this.denominador}`, { fontSize: '50px', fill: 'black', fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 });

        verificarButton.on('pointerdown', () => {

            const inputNumerator = parseInt(numeratorInput.value);
            const inputDenominator = parseInt(denominatorInput.value);

            if (!isNaN(inputNumerator) && !isNaN(inputDenominator)) {

                if (inputNumerator === this.numerador && inputDenominator === this.denominador) {
                    console.log("¡Felicitaciones!");
                    document.body.removeChild(denominatorInput);
                    document.body.removeChild(numeratorInput);
                    this.scene.start('Correcto');
                } else {
                    this.intentos++; // Incrementar los intentos
                    if (this.intentos >= 3) {
                        // Llevar al jugador a la escena de "gameOver"
                        document.body.removeChild(denominatorInput);
                        document.body.removeChild(numeratorInput);
                        this.scene.start('GameOver');
                    } else {
                        console.log("Inténtalo de nuevo.");
                        const incorrectSprite = this.add.sprite(400, 300, 'incorrect');

                        // Configura la animación para que se reproduzca automáticamente
                        incorrectSprite.play('incorrect_animation'); // 'incorrect_animation' es el nombre de la animación

                        // Establece un temporizador para ocultar el sprite después de cierto tiempo
                        this.time.delayedCall(2000, () => {
                            incorrectSprite.setVisible(false);
                        });
                    }
                }
            }
        });

        backButton.on('pointerdown', () => {
            if (numeratorInput) {
                document.body.removeChild(numeratorInput);
            }

            if (denominatorInput) {
                document.body.removeChild(denominatorInput);
            }
            this.scene.start('Bootloader'); // Esto te llevará de vuelta a la escena Bootloader
        });

        const centerX = 500;
        const centerY = 360;
        const circleRadius = 120;
        const sliceAngle = (Math.PI * 2) / sliceCount;

        // Restablecer valores
        selectedSlices = [];

        // Dibujar el círculo
        circle = this.add.graphics({
            fillStyle: { color: 0x585EFF },
            lineStyle: { color: 0x00C49C }
        });

        circle.fillCircle(centerX, centerY, circleRadius);

        // Crear el gráfico para las particiones y las líneas
        sliceGraphics = this.add.graphics();
        lineGraphics = this.add.graphics({ lineStyle: { color: lineColor } });

        // Dibujar las particiones y las líneas
        for (let i = 0; i < sliceCount; i++) {
            const angle = sliceAngle * i;
            const x1 = centerX + Math.cos(angle) * circleRadius;
            const y1 = centerY + Math.sin(angle) * circleRadius;
            const x2 = centerX + Math.cos(angle) * (circleRadius + 10);
            const y2 = centerY + Math.sin(angle) * (circleRadius + 10);
            lineGraphics.lineBetween(centerX, centerY, x2, y2);
            sliceGraphics.fillStyle(0xffcc80);
            sliceGraphics.fillTriangle(centerX, centerY, x1, y1, x2, y2);
        }

        // Crear los elementos de entrada dentro del canvas del juego
        numeratorInput = document.createElement('input');
        numeratorInput.type = 'number';
        numeratorInput.style.position = 'absolute';
        numeratorInput.style.top = '10px';
        numeratorInput.style.left = '10px';
        numeratorInput.style.background = 'transparent';

        denominatorInput = document.createElement('input');
        //denominatorInput.type = 'number';
        denominatorInput.style.fontSize = '30px';
        denominatorInput.style.position = 'absolute';
        denominatorInput.style.top = '45px';
        denominatorInput.style.left = '720px';
        denominatorInput.style.width = '50px';
        denominatorInput.style.height = '50px';
        denominatorInput.style.background = 'transparent';
        denominatorInput.style.color = 'white';
        denominatorInput.style.borderRadius = '10px'; // Redondear los bordes
        denominatorInput.style.border = '2px solid #21EF80';
        denominatorInput.addEventListener('input', this.handleDenominatorChange.bind(this));

        document.body.appendChild(numeratorInput);
        document.body.appendChild(denominatorInput);

        // Configurar la interacción del usuario
        this.input.on('pointerdown', this.handleClick, this);
    }


    update() {
        // Lógica de actualización del juego aquí
    }

    updateSliceColors() {
        const centerX = 500;
        const centerY = 360;
        const circleRadius = 120;
        const sliceAngle = (Math.PI * 2) / sliceCount;

        sliceGraphics.clear(); // Limpiar los colores anteriores

        for (let i = 0; i < sliceCount; i++) {
            if (selectedSlices.includes(i)) {
                const startAngle = (Math.PI * 2 * i) / sliceCount;
                const endAngle = (Math.PI * 2 * (i + 1)) / sliceCount;

                sliceGraphics.fillStyle(0xffff00);

                // Dibujar líneas para simular el arco relleno
                for (let angle = startAngle; angle < endAngle; angle += 0.01) {
                    const x1 = centerX + Math.cos(angle) * circleRadius;
                    const y1 = centerY + Math.sin(angle) * circleRadius;
                    const x2 = centerX + Math.cos(angle + 0.01) * circleRadius;
                    const y2 = centerY + Math.sin(angle + 0.01) * circleRadius;
                    sliceGraphics.lineBetween(centerX, centerY, x1, y1);
                    sliceGraphics.lineBetween(centerX, centerY, x2, y2);
                }
            }
        }

        // Actualizar las líneas con el nuevo número de particiones
        lineGraphics.clear();

        for (let i = 0; i < sliceCount; i++) {
            const angle = sliceAngle * i;
            const x1 = centerX + Math.cos(angle) * circleRadius;
            const y1 = centerY + Math.sin(angle) * circleRadius;
            const x2 = centerX + Math.cos(angle) * (circleRadius + 10);
            const y2 = centerY + Math.sin(angle) * (circleRadius + 10);
            lineGraphics.lineBetween(centerX, centerY, x2, y2);
        }
    }

    handleDenominatorChange() {
        const newDenominator = parseInt(denominatorInput.value);

        if (!isNaN(newDenominator) && newDenominator >= 2) {
            sliceCount = newDenominator;
            this.updateSliceColors(); // Actualizar particiones y líneas con el nuevo denominador
        } else {
            // Mostrar un mensaje de error o realizar alguna acción
            console.log("El denominador debe ser igual o mayor a 2");
        }
    }

    handleClick(pointer) {
        const centerX = 500;
        const centerY = 360;
        const distance = Phaser.Math.Distance.Between(centerX, centerY, pointer.x, pointer.y);
        const circleRadius = 100;

        if (distance <= circleRadius) {
            const angle = Phaser.Math.Angle.Between(centerX, centerY, pointer.x, pointer.y);
            const sliceAngle = (Math.PI * 2) / sliceCount;

            const clickedIndex = Math.floor((angle + Math.PI * 2) / sliceAngle) % sliceCount;

            if (selectedSlices.includes(clickedIndex)) {
                selectedSlices = selectedSlices.filter(index => index !== clickedIndex);
            } else {
                selectedSlices.push(clickedIndex);
            }

            this.updateSliceColors(); // Actualizar colores de las particiones y líneas

            // Actualizar el campo de numerador con la cantidad de fragmentos seleccionados
            numeratorInput.value = selectedSlices.length;

            // Verificar si los valores coinciden y mostrar un mensaje en la consola
            const inputNumerador = parseInt(numeratorInput.value);
            const inputDenominador = parseInt(denominatorInput.value);

            if (inputNumerador === this.numerador && inputDenominador === this.denominador) {
                console.log("¡Felicitaciones! Los valores coinciden.");
            } else {
                console.log("Los valores no coinciden. Inténtalo de nuevo.");
            }
        }
    }

}

