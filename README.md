# 📊 Sistema de Controle de Estoque e Vendas

Sistema completo de controle de estoque e vendas integrado com Google Sheets, desenvolvido com Google Apps Script.

## ✨ Funcionalidades

### Dashboard Analytics
- 💰 Resumo de ganhos do dia atual
- 📈 Gráfico interativo de ganhos (7, 14 ou 30 dias)
- 🛒 Listagem das últimas vendas realizadas
- 📊 Indicadores de desempenho (vendas totais, itens vendidos, média diária)

### Gerenciamento de Produtos
- ➕ Cadastro de produtos com nome, SKU, preço e estoque
- 📦 Visualização em grade com indicadores de estoque
- ✏️ Edição rápida de estoque
- 🗑️ Exclusão de produtos

### Registro de Vendas
- 🛍️ Registro de vendas com seleção de produtos
- ⚡ Atualização automática de estoque
- 💵 Cálculo automático de valor total
- 📅 Filtro de vendas por data
- 📊 Resumo de faturamento diário

## 🚀 Guia de Instalação e Deploy (Passo a Passo)

### Passo 1: Criar uma Nova Planilha Google

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em **+ Novo** (botão verde) ou use o atalho `Ctrl + Shift + N`
3. Dê um nome para sua planilha (ex: "Sistema de Estoque - Loja Jhon")

### Passo 2: Abrir o Editor de Scripts

1. Na planilha criada, clique no menu **Extensões** (no topo)
2. Selecione **Apps Script**
3. Uma nova aba será aberta com o editor de código

![Como acessar Apps Script](https://developers.google.com/static/apps-script/images/script-editor-new.png)

### Passo 3: Copiar os Arquivos do Projeto

No editor do Apps Script, você verá um arquivo chamado `Code.gs`. Vamos substituí-lo e adicionar novos arquivos:

#### 3.1. Substituir Code.gs

1. Selecione todo o conteúdo do arquivo `Code.gs`
2. Apague o conteúdo atual
3. Copie o conteúdo do arquivo `apps-script/Code.gs` deste projeto
4. Cole no editor

#### 3.2. Adicionar Novos Arquivos

Para cada arquivo abaixo, clique no **+** ao lado de "Arquivos" e selecione o tipo:

**Arquivos de Script (.gs):**
1. Clique em **+** > **Script**
2. Nomeie como `ProductService` (sem extensão)
3. Cole o conteúdo de `apps-script/ProductService.gs`
4. Repita para:
   - `SalesService` ← conteúdo de `apps-script/SalesService.gs`
   - `Utils` ← conteúdo de `apps-script/Utils.gs`

**Arquivos HTML:**
1. Clique em **+** > **HTML**
2. Nomeie como `DashboardPage`
3. Cole o conteúdo de `apps-script/DashboardPage.html`
4. Repita para:
   - `ProductsPage` ← conteúdo de `apps-script/ProductsPage.html`
   - `SalesPage` ← conteúdo de `apps-script/SalesPage.html`
   - `styles` ← conteúdo de `apps-script/styles.html`

### Passo 4: Configurar o Manifesto

1. No menu lateral esquerdo, clique no ícone de **engrenagem** ⚙️ (Configurações do projeto)
2. Marque a opção **Mostrar arquivo de manifesto "appsscript.json" no editor**
3. Volte para o editor clicando em **Editor** (<>)
4. Abra o arquivo `appsscript.json` que apareceu
5. Substitua o conteúdo pelo arquivo `apps-script/appsscript.json` deste projeto

### Passo 5: Fazer o Deploy da Web App

1. No topo direito do editor, clique em **Implantar** > **Nova implantação**
2. Clique no ícone de **engrenagem** ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: "Sistema de Estoque v1.0"
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. Autorize o aplicativo (clique em **Autorizar acesso**)
7. Faça login com sua conta Google
8. Clique em **Avançado** > **Ir para [nome do projeto] (não seguro)**
9. Clique em **Permitir**

### Passo 6: Copiar a URL da Web App

Após a autorização, você verá uma tela com:
- **ID da implantação**: (um código longo)
- **URL do aplicativo da Web**: `https://script.google.com/macros/s/...` ← **COPIE ESTA URL!**

**Esta é a URL que você usará para acessar seu sistema!**

## 📱 Como Usar o Sistema

### Acessando o Sistema

1. Cole a URL copiada no passo 6 em seu navegador
2. O sistema abrirá mostrando o **Dashboard**

### Navegação

Use os botões no topo para navegar entre:
- **Dashboard**: Visão geral de vendas e ganhos
- **Produtos**: Gerenciar produtos
- **Vendas**: Registrar novas vendas

### Cadastrando Produtos

1. Acesse a página **Produtos**
2. Preencha o formulário:
   - Nome do Produto (obrigatório)
   - SKU (código único, obrigatório)
   - Preço em reais (obrigatório)
   - Estoque inicial (obrigatório)
   - Descrição (opcional)
3. Clique em **Cadastrar Produto**

### Registrando Vendas

1. Acesse a página **Vendas**
2. Selecione um produto da lista
3. Digite a quantidade
4. O sistema mostrará:
   - Estoque disponível
   - Preço unitário
   - Valor total da venda
5. Clique em **Registrar Venda**
6. O estoque será atualizado automaticamente!

### Visualizando Dados na Planilha

Volte para sua planilha do Google Sheets. Você verá duas abas criadas automaticamente:

- **Produtos**: Lista de todos os produtos cadastrados
- **Vendas**: Registro de todas as vendas realizadas

## 🎨 Recursos do Dashboard

- **Ganhos Hoje**: Mostra o faturamento do dia atual
- **Itens Vendidos**: Total de produtos vendidos hoje
- **Média Diária**: Média de ganhos dos últimos 7 dias
- **Total (30d)**: Faturamento total dos últimos 30 dias
- **Gráfico**: Visualização de ganhos com opções de 7, 14 ou 30 dias
- **Últimas Vendas**: Lista das vendas mais recentes

## 🔄 Atualizando o Sistema

Se você fizer alterações no código:

1. Salve as alterações no editor (Ctrl + S)
2. Clique em **Implantar** > **Gerenciar implantações**
3. Clique no ícone de **lápis** ✏️ da implantação ativa
4. Em **Versão**, selecione **Nova versão**
5. Adicione uma descrição (ex: "Versão 1.1 - Correção de bugs")
6. Clique em **Implantar**

**Importante**: A URL permanece a mesma!

## 📂 Estrutura do Projeto

```
apps-script/
├── Code.gs              # Arquivo principal e rotas
├── ProductService.gs    # Gerenciamento de produtos
├── SalesService.gs      # Gerenciamento de vendas
├── Utils.gs             # Funções utilitárias
├── appsscript.json      # Manifesto do projeto
├── DashboardPage.html   # Interface do dashboard
├── ProductsPage.html    # Interface de produtos
├── SalesPage.html       # Interface de vendas
└── styles.html          # Estilos CSS compartilhados
```

## ❓ Problemas Comuns e Soluções

### Erro: "O script não tem permissão para realizar essa ação"

**Solução**: Revise as permissões no Passo 5. Certifique-se de que escolheu "Executar como: Eu" e autorizou corretamente.

### Dashboard não carrega dados

**Solução**: 
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Certifique-se de que a planilha não está vazia
4. Tente cadastrar um produto primeiro

### Vendas não atualizam o estoque

**Solução**: Verifique se o produto tem estoque disponível. O sistema bloqueia vendas com estoque insuficiente.

### Erro "Script function not found"

**Solução**: 
1. Verifique se todos os arquivos foram copiados corretamente
2. Salve novamente todos os arquivos
3. Faça um novo deploy

## 🔐 Segurança

- Por padrão, a Web App está configurada para "Qualquer pessoa" ter acesso
- Para restringir, no deploy escolha "Somente eu" em "Quem tem acesso"
- Os dados ficam armazenados na sua planilha Google (privada)

## 💡 Dicas

1. **Backup**: Faça cópias da planilha periodicamente
2. **Compartilhamento**: Você pode compartilhar a URL com sua equipe
3. **Mobile**: O sistema é responsivo e funciona em celulares
4. **Exportação**: Use as funções do Google Sheets para exportar relatórios

## 🛠️ Tecnologias Utilizadas

- **Backend**: Google Apps Script (JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **Gráficos**: Chart.js
- **Banco de Dados**: Google Sheets
- **Design**: CSS moderno com gradientes e animações

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Revise os passos de instalação
3. Certifique-se de que todos os arquivos foram copiados

---

**Desenvolvido com ❤️ para facilitar o controle de estoque da sua loja!**
