const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Função para substituir variáveis no template
function substituirVariaveis(template, dados) {
  let html = template;
  
  for (const [chave, valor] of Object.entries(dados)) {
    const regex = new RegExp(`{{${chave}}}`, 'g');
    html = html.replace(regex, valor || '');
  }
  
  return html;
}

// Função para encontrar o Chrome instalado no sistema
function encontrarChrome() {
  // Caminhos possíveis do Chrome no Windows
  const caminhosPossiveis = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env.PROGRAMFILES, 'Google\\Chrome\\Application\\chrome.exe'),
  ];
  
  for (const caminho of caminhosPossiveis) {
    if (fs.existsSync(caminho)) {
      console.log(`✅ Chrome encontrado em: ${caminho}`);
      return caminho;
    }
  }
  
  console.warn('⚠️  Chrome não encontrado nos caminhos conhecidos');
  return null;
}

// Função para gerar PDF
async function gerarPDF(htmlContent) {
  let browser;
  try {
    console.log('📄 Iniciando geração de PDF...');
    
    const chromePath = encontrarChrome();
    
    if (!chromePath) {
      throw new Error('Chrome não está instalado. Por favor, instale o Google Chrome para gerar PDFs.');
    }
    
    // Lançar o navegador apontando para o Chrome instalado
    console.log('🚀 Iniciando Puppeteer com Chrome...');
    browser = await puppeteer.launch({
      headless: true,
      executablePath: chromePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    console.log('📑 Criando página...');
    const page = await browser.newPage();
    
    // Configurar tamanho de página A4
    console.log('📐 Configurando conteúdo HTML...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log('⚙️  Gerando PDF...');
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '20mm',
        right: '20mm'
      },
      printBackground: true
    });
    
    console.log('✅ PDF gerado com sucesso!');
    await browser.close();
    return pdf;
    
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error.message);
    
    // Tentar fechar o browser em caso de erro
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error('Erro ao fechar browser:', e.message);
      }
    }
    
    throw error;
  }
}

// Rota para servir o HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para gerar o contrato em PDF
app.post('/gerar-contrato', async (req, res) => {
  try {
    console.log('\n📋 Solicitação de geração de contrato recebida');
    
    // Ler template
    const templatePath = path.join(__dirname, 'public', 'template.html');
    console.log(`📂 Lendo template de: ${templatePath}`);
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Substituir variáveis com dados recebidos
    const dados = req.body;
    console.log('✏️  Preenchendo dados do contrato...');
    const htmlPreenchido = substituirVariaveis(template, dados);
    
    // Gerar PDF
    const pdf = await gerarPDF(htmlPreenchido);
    
    // Enviar PDF para download
    console.log('📤 Enviando PDF para download...');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="contrato.pdf"');
    res.send(pdf);
    console.log('✅ PDF enviado com sucesso!\n');
    
  } catch (error) {
    console.error('❌ Erro na geração do contrato:', error.message);
    console.error(error.stack);
    res.status(500).json({ 
      erro: 'Erro ao gerar PDF',
      detalhes: error.message 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Servidor rodando em porta ${PORT}`);
  const url = PORT === 3000 ? `http://localhost:${PORT}` : `(Render/Produção)`;
  console.log(`📍 Acesso: ${url}`);
  console.log(`${'='.repeat(60)}\n`);
  
  // Verificar Chrome na inicialização
  const chromePath = encontrarChrome();
  if (chromePath) {
    console.log(`✅ Chrome detectado e pronto para usar\n`);
  } else {
    console.warn(`⚠️  AVISO: Chrome não encontrado. A geração de PDF não funcionará.\n`);
  }
});
