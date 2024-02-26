let selectedFile;

function readPDF() {
  const pdfInput = document.getElementById('pdfInput');
  selectedFile = pdfInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const typedArray = new Uint8Array(event.target.result);
      parsePDF(typedArray);
    };

    reader.readAsArrayBuffer(selectedFile);
  } else {
    alert('Pilih file PDF terlebih dahulu.');
  }
}

function parsePDF(data) {
  pdfjsLib.getDocument(data).promise.then(function(pdfDoc) {
    const numPages = pdfDoc.numPages;
    let pdfText = '';

    for (let i = 1; i <= numPages; i++) {
      pdfDoc.getPage(i).then(function(page) {
        return page.getTextContent();
      }).then(function(content) {
        content.items.forEach(function(item) {
          pdfText += item.str + ' ';
        });

        // Update the textarea with the text from the PDF
        document.getElementById('textToSpeak').value = pdfText;
      });
    }
  });
}

function speak() {
  const textToSpeak = document.getElementById('textToSpeak').value;
  
  if (textToSpeak) {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      utterance.lang = 'id-ID';  // Set the language to Indonesian (you can change it based on your requirements)

      synthesis.speak(utterance);
    } else {
      alert('Web Speech API is not supported in your browser.');
    }
  } else {
    alert('Teks kosong. Silakan baca PDF terlebih dahulu.');
  }
}
