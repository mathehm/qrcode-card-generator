# Gerador de Cartões de Visita com QR Code

Este projeto é um script em Node.js que gera um PDF contendo cartões de visita com QR codes únicos e uma logo em cada cartão. Cada QR code é gerado com um número iterável de 0001 a 1000.

## Requisitos

- Node.js
- npm ou yarn

## Dependências

- jsPDF: Biblioteca para a geração de PDFs.
- qrcode: Biblioteca para geração de QR codes.

## Instalação

- Clone este repositório:

```
git clone https://github.com/mathehm/qrcode-card-generator.git
```

- Navegue até o diretório do projeto:

```
cd qrcode-card-generator
```

- Instale as dependências:

```
npm install

ou

yarn install
```

## Uso

Substitua sua logo na pasta do projeto (./logo.png).

- Execute o script:

```
node generateCards.js
```

- O script gerará um arquivo PDF chamado qrcodes.pdf contendo os cartões de visita.
