// Obtener el elemento del textarea
const textArea = document.querySelector('#main__text-area');

// Obtener elementos del footer
const footerHeader = document.querySelector('.footer__header');
const footerParagraph = document.querySelector('.footer__paragraph');
const encryptionDisplay = document.querySelector('.code');
const copyButton = document.querySelector('.copy');
const desktopImage = document.querySelector('.footer span');

// Obtener botones de encriptar y desencriptar
const encryptionButton = document.querySelector('.main__button--encrypt');
const decryptionButton = document.querySelector('.main__button--decrypt');

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

/**
 * Función que codifica el texto pasado como argumento, reemplazando las vocales por valores codificados.
 * Si el texto no contiene ninguna vocal, devuelve el mismo texto sin cambios.
 */
function encodeCode(text) {
  // Encode
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const replacements = ['ai', 'enter', 'imes', 'ober', 'ufat'];

  // Verificar si hay alguna vocal en el texto
  if (vowels.some(vowel => text.includes(vowel))) {
    // Reemplazar las vocales en el texto
    const modifiedText = text
      .split('')
      .map(char => {
        const vowelIndex = vowels.indexOf(char);
        return vowelIndex > -1 ? replacements[vowelIndex] : char;
      })
      .join('');
    return modifiedText;
  }
  return text;
}

/**
 * Función que decodifica el texto codificado pasado como argumento, reemplazando los valores codificados por las vocales originales.
 * Si el texto no contiene ninguno de los valores codificados, devuelve el mismo texto sin cambios.
 */
function decodeCode(encodedText) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const replacements = ['ai', 'enter', 'imes', 'ober', 'ufat'];
  let decodedText = encodedText;

  // Reemplazar los reemplazos en el texto
  replacements.forEach((replacement, index) => {
    decodedText = decodedText.split(replacement).join(vowels[index]);
  });

  return decodedText;
}

function encryptionConfigs() {
  if (textArea.value.length > 0) {
    footerHeader.classList.add('hide');
    footerParagraph.classList.add('hide');
    encryptionDisplay.classList.remove('hide');
    copyButton.classList.remove('hide');
    desktopImage.classList.add('hide');
  } else {
    footerHeader.classList.remove('hide');
    footerParagraph.classList.remove('hide');
    encryptionDisplay.classList.add('hide');
    copyButton.classList.add('hide');
    desktopImage.classList.remove('hide');
    encryptionDisplay.textContent = '';
  }
}

// Escuchar el evento de entrada del usuario para llamar a la función cleanText()
textArea.addEventListener('input', cleanText);

encryptionButton.addEventListener('click', () => {
  encryptionDisplay.textContent = encodeCode(textArea.value);
  encryptionConfigs();
});
decryptionButton.addEventListener('click', () => {
  encryptionDisplay.textContent = decodeCode(textArea.value);
  encryptionConfigs();
});

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(encryptionDisplay.textContent);
});
