# 🪟 Gerador de Contratos em PDF

Um sistema web completo para gerar contratos profissionais em PDF para serviços de instalação de vidros e esquadrias.

## 📋 Características

✅ Formulário intuitivo e responsivo  
✅ Geração automática de PDF baseado em template  
✅ Download direto do contrato  
✅ Validação em tempo real  
✅ Design moderno e profissional  
✅ Campos pré-configurados para serviços de vidro  

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **PDF:** Puppeteer
- **CORS:** Habilitado para requisições cross-origin

## 📁 Estrutura do Projeto

```
aba/
├── package.json          # Dependências do projeto
├── server.js             # Servidor Express
├── public/
│   ├── index.html        # Página principal (formulário)
│   ├── template.html     # Template do contrato
│   ├── style.css         # Estilos CSS
│   └── script.js         # Lógica do frontend
└── README.md             # Este arquivo
```

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

Este comando instalará:
- `express` - Framework web
- `puppeteer` - Geração de PDF
- `cors` - Suporte a CORS

### 2. Iniciar o Servidor

```bash
node server.js
```

Ou use:
```bash
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
Abra seu navegador e acesse http://localhost:3000
```

### 3. Acessar no Navegador

Abra seu navegador e acesse: **http://localhost:3000**

### 4. Preencher o Formulário

Os campos disponíveis são:

**Dados do Contratante:**
- Nome do Contratante (obrigatório)
- CPF (obrigatório, auto-formatado)
- Endereço (obrigatório)

**Dados do Serviço:**
- Medidas do Vão - altura x largura (obrigatório)
- Tipo de Vidro (obrigatório)
- Cor do Alumínio (obrigatório)
- Local de Instalação (obrigatório)

**Valores e Pagamento:**
- Valor à Vista em R$ (obrigatório)
- Valor a Prazo em R$ (obrigatório)
- Forma de Pagamento (obrigatório)
- Prazo de Entrega e Instalação (obrigatório)

### 5. Gerar o Contrato

Clique no botão "Gerar PDF do Contrato" para:
1. Validar todos os dados
2. Processar o formulário
3. Gerar PDF profissional
4. Fazer download automático

## 📊 O Que Acontece Nos Bastidores

1. **Frontend** coleta os dados do formulário
2. **JavaScript** valida e formata os dados
3. **POST Request** envia para `http://localhost:3000/gerar-contrato`
4. **Backend** lê o template HTML
5. **Substituição de Variáveis** preenche os dados dinâmicos ({{nome}}, {{cpf}}, etc)
6. **Puppeteer** converte HTML em PDF de alta qualidade
7. **Download** é acionado automaticamente no navegador

## 🎨 Personalizações Possíveis

### Editar Template do Contrato
Abra `public/template.html` e modifique o conteúdo conforme necessário.

**Variáveis disponíveis:**
- `{{nome}}` - Nome do contratante
- `{{cpf}}` - CPF do contratante
- `{{endereco}}` - Endereço
- `{{medidas}}` - Medidas do vão
- `{{tipo_vidro}}` - Tipo de vidro
- `{{cor_aluminio}}` - Cor do alumínio
- `{{local_instalacao}}` - Local da instalação
- `{{valor_vista}}` - Valor à vista
- `{{valor_prazo}}` - Valor a prazo
- `{{forma_pagamento}}` - Forma de pagamento
- `{{prazo_entrega}}` - Prazo de entrega

### Editar Estilos
Modifique `public/style.css` para alterar cores, fontes e layout.

### Adicionar Novos Campos
1. Adicione um `<input>` ou `<select>` em `public/index.html`
2. Use o mesmo `name` como chave
3. Adicione `{{chave}}` no `template.html`

## 🐛 Solução de Problemas

### "Erro ao gerar PDF"
- Verifique se o Puppeteer foi instalado: `npm install`
- Certifique-se de que há espaço em disco disponível

### Porta 3000 já está em uso
Altere a porta em `server.js`:
```javascript
const PORT = 3001; // Mude para outra porta
```

### PDF vem em branco
- Verifique se o template.html está no caminho correto
- Certifique-se de que as variáveis estão escritas corretamente

### Downloads não funcionam
- Verifique as configurações de bloqueador de pop-ups do navegador
- Teste em outro navegador

## 📝 Exemplo de Uso

1. Abra http://localhost:3000
2. Preencha os campos:
   - Nome: João Silva
   - CPF: 123.456.789-00
   - Endereço: Rua das Flores, 123
   - Medidas: 1.50m x 2.00m
   - Vidro: Transparente 8mm
   - Alumínio: Branco
   - Local: Sala
   - Valor à Vista: R$ 1.500,00
   - Valor Prazo: R$ 1.650,00
   - Pagamento: PIX
   - Prazo: 5 dias úteis
3. Clique "Gerar PDF do Contrato"
4. O PDF será baixado automaticamente

## 📦 Deploy em Produção

Para colocar em produção:

1. Instale em um servidor Node.js
2. Use um gerenciador de processos como PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```
3. Configure um proxy reverso (Nginx/Apache)
4. Ative SSL/TLS

## 📄 Licença

Este projeto é livre para uso e modificação.

## 🤝 Suporte

Qualquer dúvida ou sugestão? O código está bem comentado e é fácil de personalizar!

---

**Desenvolvido para facilitar a geração de contratos profissionais** 🚀
