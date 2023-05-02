// Obtener el elemento del textarea
const textArea = document.querySelector('#main__text-area');

/**
 * Función que convierte el texto del elemento textArea a minúsculas y elimina caracteres especiales.
 * Actualiza el valor del elemento textArea con el nuevo texto limpio.
 */
function cleanText() {
  // Obtener el valor actual del elemento textArea
  const textAreaValue = textArea.value;

  // Convertir el valor a minúsculas y eliminar caracteres especiales
  let lowercaseText = '';
  for (let i = 0; i < textAreaValue.length; i++) {
    const currentChar = textAreaValue.charAt(i);
    if (/^[a-zñ\s]+$/.test(currentChar)) {
      // Agregar caracteres válidos al nuevo texto en minúsculas
      lowercaseText += currentChar.toLowerCase();
    }
  }

  // Actualizar el valor del elemento textArea con el nuevo texto limpio
  textArea.value = lowercaseText;
}

// Escuchar el evento de entrada del usuario para llamar a la función cleanText()
textArea.addEventListener('input', () => {
  cleanText();
});
