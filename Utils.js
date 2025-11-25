/**
 * Utilitários e funções auxiliares
 */

/**
 * Obtém a planilha ativa
 */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Inicializa as abas da planilha se não existirem
 */
function initializeSheets() {
  const ss = getSpreadsheet();
  
  // Criar aba de Produtos
  let productsSheet = ss.getSheetByName('Produtos');
  if (!productsSheet) {
    productsSheet = ss.insertSheet('Produtos');
    productsSheet.getRange('A1:G1').setValues([[
      'ID', 'Nome', 'Descrição', 'SKU', 'Preço', 'Estoque Atual', 'Data de Cadastro'
    ]]);
    productsSheet.getRange('A1:G1').setFontWeight('bold');
    productsSheet.setFrozenRows(1);
  }
  
  // Criar aba de Vendas
  let salesSheet = ss.getSheetByName('Vendas');
  if (!salesSheet) {
    salesSheet = ss.insertSheet('Vendas');
    salesSheet.getRange('A1:G1').setValues([[
      'ID', 'Data', 'Produto', 'SKU', 'Quantidade', 'Valor Unitário', 'Valor Total'
    ]]);
    salesSheet.getRange('A1:G1').setFontWeight('bold');
    salesSheet.setFrozenRows(1);
  }
  
  return { productsSheet, salesSheet };
}

/**
 * Gera um ID único baseado em timestamp
 */
function generateId() {
  return 'ID' + new Date().getTime();
}

/**
 * Formata data para padrão brasileiro
 */
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

/**
 * Formata valor monetário
 */
function formatCurrency(value) {
  return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
}

/**
 * Valida se um produto existe pelo ID
 */
function validateProductExists(productId) {
  const sheets = initializeSheets();
  const data = sheets.productsSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === productId) {
      return true;
    }
  }
  return false;
}

/**
 * Obtém produto por ID
 */
function getProductById(productId) {
  const sheets = initializeSheets();
  const data = sheets.productsSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === productId) {
      return {
        id: data[i][0],
        name: data[i][1],
        description: data[i][2],
        sku: data[i][3],
        price: data[i][4],
        stock: data[i][5],
        createdAt: data[i][6],
        rowIndex: i + 1
      };
    }
  }
  return null;
}

/**
 * Converte data do formato brasileiro para Date
 */
function parseDate(dateStr) {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return dateStr;
  
  // Formato: DD/MM/YYYY ou DD/MM/YYYY HH:mm:ss
  const parts = dateStr.split(' ');
  const dateParts = parts[0].split('/');
  
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);
    
    if (parts.length > 1) {
      const timeParts = parts[1].split(':');
      return new Date(year, month, day, 
        parseInt(timeParts[0]), 
        parseInt(timeParts[1]), 
        parseInt(timeParts[2] || 0)
      );
    }
    
    return new Date(year, month, day);
  }
  
  return new Date(dateStr);
}

/**
 * Retorna início e fim do dia
 */
function getDayBounds(date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
}
