// Referências aos elementos do DOM
const formulario = document.getElementById('formularioContrato');
const mensagem = document.getElementById('mensagemStatus');

// Função para exibir mensagem
function exibirMensagem(texto, tipo = 'processando', duracao = 0) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem-status ${tipo}`;
  
  if (duracao > 0) {
    setTimeout(() => {
      mensagem.style.display = 'none';
    }, duracao);
  }
}

// Função para formatar CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar valores em moeda
function formatarMoeda(valor) {
  return valor.toFixed(2).replace('.', ',');
}

// Event listener para formatação de CPF
document.getElementById('cpf').addEventListener('blur', function() {
  this.value = formatarCPF(this.value);
});

// Event listener para formatação de valores - mantém como número
document.getElementById('valor_vista').addEventListener('blur', function() {
  if (this.value) {
    this.value = parseFloat(this.value).toFixed(2);
  }
});

document.getElementById('valor_prazo').addEventListener('blur', function() {
  if (this.value) {
    this.value = parseFloat(this.value).toFixed(2);
  }
});

// Função para preparar dados para envio
function prepararDados(formData) {
  const dados = {};
  
  for (let [chave, valor] of formData.entries()) {
    dados[chave] = valor.trim();
  }
  
  return dados;
}

// Tratamento do envio do formulário
formulario.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Validar se o formulário está válido
  if (!formulario.checkValidity()) {
    exibirMensagem('⚠️ Por favor, preencha todos os campos obrigatórios', 'erro', 5000);
    return;
  }
  
  try {
    // Mostrar mensagem de processamento
    exibirMensagem('⏳ Gerando PDF do contrato... Por favor, aguarde!', 'processando');
    
    // Desabilitar botão
    const botao = formulario.querySelector('.btn-primary');
    botao.disabled = true;
    
    // Coletar dados do formulário
    const formData = new FormData(formulario);
    const dados = prepararDados(formData);
    
    // Fazer requisição POST para gerar PDF
    const response = await fetch('/gerar-contrato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.detalhes || 'Erro ao gerar PDF');
    }
    
    // Obter o PDF como blob
    const blob = await response.blob();
    
    // Criar URL para download
    const url = window.URL.createObjectURL(blob);
    
    // Criar elemento de link para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `contrato_${dados.nome.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    
    // Disparar download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpar URL
    window.URL.revokeObjectURL(url);
    
    // Mostrar mensagem de sucesso
    exibirMensagem('✅ PDF gerado com sucesso! Seu contrato será baixado em instantes.', 'sucesso', 5000);
    
    // Habilitar botão novamente
    botao.disabled = false;
    
  } catch (erro) {
    console.error('Erro:', erro);
    exibirMensagem(`❌ Erro ao gerar PDF: ${erro.message}`, 'erro', 5000);
    
    // Habilitar botão novamente
    const botao = formulario.querySelector('.btn-primary');
    botao.disabled = false;
  }
});

// Validação em tempo real para melhor UX
document.querySelectorAll('input[required], select[required]').forEach(campo => {
  campo.addEventListener('change', function() {
    if (this.value.trim()) {
      this.style.borderColor = '#e0e0e0';
    }
  });
});

// Mensagem inicial ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Gerador de Contratos em PDF carregado com sucesso!');
});
