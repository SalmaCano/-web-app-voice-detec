const controltexto = document.getElementById('controltexto');

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const listeningText = document.getElementById('listeningText');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onstart = function () {
        listeningText.innerHTML = 'Escuchando...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase(); // Convertir a minúsculas para facilitar la comparación
        const keywords = ['abrir una pestaña', 'ir a una página', 'modificar el tamaño de la ventana', 'cerrar una pestaña', 'cerrar el navegador']; // Array de palabras clave

        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;

        // Verificar si alguna palabra clave está presente en la transcripción
        for (let i = 0; i < keywords.length; i++) {
            if (transcript.includes(keywords[i])) {
                switch (keywords[i]) {
                    case 'tamaño 4':
                        controltexto.classList.add("fs-1");
                        controltexto.classList.add("fs-1");
                        controltexto.style.color = "red";
                        console.log("Se encontró la palabra 'tamaño 4'.");
                        break;
                    case 'abrir una pestaña':
                        window.open(); // Abre una nueva pestaña
                        console.log("Se detectó 'abrir una pestaña'.");
                        break;
                    case 'ir a una página':
                        window.location.href = "https://online.kadasofsolutions.com/login/index.php"; // Cambia la URL actual del navegador
                        console.log("Se detectó 'ir a una página'.");
                        break;
                    
                    case 'cerrar una pestaña':
                        window.close(); // Cierra la pestaña actual
                        console.log("Se detectó 'cerrar una pestaña'.");
                        break;
                
                }
            }
        }

        // Envía la frase a la base de datos MockAPI
        enviarFraseAFirebase(transcript);
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
        listeningText.innerHTML = 'Fin de la escucha';
    };

    startBtn.addEventListener('click', function () {
        recognition.start();
    });

    // Función para enviar la frase a la base de datos MockAPI
    function enviarFraseAFirebase(frase) {
        // Datos que deseas enviar a la base de datos
        var data = {
            frase: frase
        };

        // Opciones para la solicitud fetch
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // URL de tu API de MockAPI
        var url = 'https://660e07c96ddfa2943b359ce5.mockapi.io/detector';

        // Realizar la solicitud fetch para enviar los datos a la API
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('Los datos se enviaron correctamente:', data);
                // Realizar cualquier otra acción que necesites después de enviar los datos
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});


