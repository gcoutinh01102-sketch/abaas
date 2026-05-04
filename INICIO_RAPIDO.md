# 🚀 INÍCIO RÁPIDO

## ⚡ Em 3 passos seu sistema está rodando!

### Passo 1: Instalar Dependências
Abra o terminal/PowerShell na pasta do projeto e execute:

```bash
npm install
```

⏳ *Aguarde 1-2 minutos enquanto o Puppeteer é baixado*

### Passo 2: Iniciar o Servidor
No mesmo terminal, execute:

```bash
node server.js
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
Abra seu navegador e acesse http://localhost:3000
```

### Passo 3: Usar o Sistema
1. Abra o navegador
2. Acesse: **http://localhost:3000**
3. Preencha o formulário com os dados do cliente
4. Clique em "Gerar PDF do Contrato"
5. ✅ O contrato em PDF será baixado automaticamente!

---

## 📁 Arquivos Importantes

| Arquivo | Função |
|---------|--------|
| `server.js` | Backend que gera o PDF |
| `public/index.html` | Formulário para preencher |
| `public/template.html` | Template do contrato |
| `public/style.css` | Aparência visual |
| `public/script.js` | Lógica do navegador |

---

## 🎨 Personalizar o Contrato

Abra `public/template.html` e edite:
- **Texto do contrato** - Mude a estrutura conforme necessário
- **Cores e fontes** - Procure por `<style>` no arquivo
- **Campos dinâmicos** - Use `{{nome}}`, `{{cpf}}`, etc.

---

## ⛔ Parar o Servidor

No terminal, pressione: **CTRL + C**

---

## ❓ Dúvidas Frequentes

**P: Porta 3000 está em uso?**  
R: Edite `server.js` e mude `const PORT = 3000;` para outra porta (ex: 3001)

**P: Instalação do Puppeteer falhou?**  
R: Execute `npm install --no-optional` ou `npm install puppeteer --build-from-source`

**P: Como adicionar novos campos?**  
R: 
1. Adicione um `<input>` em `public/index.html`
2. Use o mesmo `name` no template: `{{seu_campo}}`

---

## 🎯 Próximos Passos

- Edite o template para adicionar seu logo da empresa
- Customize as cores no CSS
- Adicione mais opções de vidro e cores de alumínio no formulário
- Estude o código para entender como funciona!

---

**Tudo pronto? Bom uso! 🎉**
