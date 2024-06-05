const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const fs = require('fs');

// Função para converter imagem para base64
function getBase64Image(imgPath) {
  const image = fs.readFileSync(imgPath);
  return `data:image/png;base64,${image.toString('base64')}`;
}

// Caminho para a logo
const logoBase64 = getBase64Image('./logo.png');

// Função para gerar QR Code
async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
}

// Função para criar um cartão de visita com QR Code e logo
async function createBusinessCard(doc, x, y, number) {
  const qrCodeDataUrl = await generateQRCode(number);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold'); // Define a fonte como negrito
  doc.text('Igreja do Caminho', x + 8, y + 30);
  doc.addImage(logoBase64, 'PNG', x + 20, y + 10, 15, 15); // Adiciona a logo
  doc.addImage(qrCodeDataUrl, 'PNG', x + 45, y + 0, 45, 45); // Adiciona o QR Code
  doc.setFontSize(16);
  doc.text(`${number}`, x + 62, y + 45);
  doc.rect(x, y, 90, 50); // Desenha borda do cartão (90mm x 50mm)
}

async function generateBusinessCards() {
  const doc = new jsPDF();
  const rows = 5; // Número de linhas de cartões por página
  const cols = 2; // Número de colunas de cartões por página
  const cardWidth = 90;
  const cardHeight = 50;
  const marginLeft = 15;
  const marginTop = 20;
  const totalCards = 1000;

  let cardIndex = 1;

  for (let i = 0; i < Math.ceil(totalCards / (rows * cols)); i++) {
    for (let j = 0; j < rows; j++) {
      for (let k = 0; k < cols; k++) {
        if (cardIndex > totalCards) break;
        const x = marginLeft + k * cardWidth;
        const y = marginTop + j * cardHeight;
        const number = String(cardIndex).padStart(4, '0'); // Formata o número com 4 dígitos
        await createBusinessCard(doc, x, y, number);
        cardIndex++;
      }
      if (cardIndex > totalCards) break;
    }
    if (i < Math.ceil(totalCards / (rows * cols)) - 1) {
      doc.addPage();
    }
  }

  doc.save('qrcodes.pdf');
}


generateBusinessCards();
