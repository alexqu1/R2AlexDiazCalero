
¡¡¡LINKS!!!

GIT -->https://github.com/alexqu1/R2AlexDiazCalero
P5 EDITOR -->https://editor.p5js.org/alexdiazcalero/full/Ef6M8e6BQ 

---------------------------------------------------------------------

1️⃣ Título del proyecto

HealthySmile – Cepillado Digital Interactivo
(Filtro interactivo para motivar a los niños a cepillarse los dientes con partículas y sonido)

2️⃣ Descripción del proyecto

Esta aplicación gráfica de escritorio está diseñada para fomentar hábitos de higiene dental en niños mediante un cepillado digital interactivo.
Usando la cámara web, la app detecta la apertura de la boca y genera partículas animadas que simulan el cepillado de dientes, acompañadas de un sonido. La temática es Halloween, usando colores verdes y naranjas para atraer la atención de los pequeños.

3️⃣ Estructura de archivos
HealthySmile/
│
├── index.html          -> Página principal
├── sketch.js           -> Código p5.js con detección de boca y partículas
├── style.css           -> Estilos CSS
├── assets/
│   └── cepillado.mp3   -> Sonido de cepillado
├── README.md           -> Documentación del proyecto

4️⃣ Estética y decisiones visuales
Tema: Halloween
Colores: verde brillante para partículas (simula cepillado), naranja y detalles oscuros de fondo para ambientación.
Partículas: generadas alrededor de la boca del usuario con movimiento ascendente.
UI: botón de inicio visible al cargar, desaparece al comenzar la experiencia.
Tipografía y estilos simples para claridad y enfoque en la interacción.

5️⃣ Workflow de la App
El usuario abre la aplicación y ve un botón “Empezar” con instrucciones.
Al pulsar Empezar, el botón y el texto desaparecen y se activa la cámara.
La app detecta la boca del usuario usando facemesh:
Si la boca está abierta: se generan partículas animadas alrededor de la boca y suena un efecto de cepillado.
Si la boca está cerrada: las partículas disminuyen y el sonido se detiene.
La barra de progreso muestra el tiempo acumulado con la boca abierta.
Cuando el usuario mantiene la boca abierta suficiente tiempo, aparece el mensaje final: “✨ ¡Dientes monstruosamente limpios!”
6️⃣ Recursos multimedia
Audio: assets/cepillado.mp3 – Reproduce sonido de cepillado mientras la boca está abierta.
Video: cámara en directo para mostrar la interacción en tiempo real.
Gráficos: partículas animadas en forma de círculos verdes.




