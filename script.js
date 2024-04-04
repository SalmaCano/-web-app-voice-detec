const startButton = document.getElementById('startButton');
const speechResult = document.getElementById('speechResult');

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
// Establecer el idioma de reconocimiento de voz 
recognition.lang = 'es-ES';

startButton.addEventListener('click', () => {
  recognition.start();
  speechResult.textContent = 'Escuchando...';
});

recognition.onresult = (event) => {
  const last = event.results.length - 1;
  const transcript = event.results[last][0].transcript;
  speechResult.textContent = 'Orden identificada: ' + transcript;

  // Verificar si la transcripción incluye la orden específica
  if (transcript.toLowerCase().includes('abrir el menú')) {
    // Aquí puedes agregar la lógica para ejecutar la orden específica
    abrirMenu();
  }
};

// Función para ejecutar la orden "Abrir el menú"
function abrirMenu() {
  // Agrega aquí el código para abrir el menú
  console.log('Se ha identificado la orden: Abrir el menú');
}