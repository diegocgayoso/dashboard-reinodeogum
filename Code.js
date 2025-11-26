/**
 * Arquivo principal do Apps Script
 * Gerencia rotas e serve as páginas HTML
 */

/**
 * Função chamada quando a Web App é acessada via GET
 */
function doGet(e) {
  // Inicializar planilhas na primeira execução
  initializeSheets();

  const page = e.parameter.page || 'dashboard';
  console.log('Navigating to page: ' + page);

  let template;
  switch (page) {
    case 'products':
      template = HtmlService.createTemplateFromFile('ProductsPage').evaluate();
      break;
    case 'sales':
      template = HtmlService.createTemplateFromFile('SalesPage').evaluate();
      break;
    case 'dashboard':
    default:
      template = HtmlService.createTemplateFromFile('DashboardPage').evaluate();
      break;
  }

  return template
    .setTitle('Sistema de Controle de Estoque')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Função chamada quando há requisições POST (API)
 */
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;

    let result;

    switch (action) {
      // Produtos
      case 'addProduct':
        result = addProduct(params.data);
        break;
      case 'getProducts':
        result = getProducts();
        break;
      case 'updateProduct':
        result = updateProduct(params.productId, params.data);
        break;
      case 'deleteProduct':
        result = deleteProduct(params.productId);
        break;
      case 'getProductById':
        const product = getProductById(params.productId);
        result = product ? { success: true, product: product } : { success: false, message: 'Produto não encontrado' };
        break;

      // Vendas
      case 'addSale':
        result = addSale(params.data);
        break;
      case 'getSales':
        result = getSales(params.limit);
        break;
      case 'getSalesByDate':
        result = getSalesByDate(params.date);
        break;
      case 'getSalesByPeriod':
        result = getSalesByPeriod(params.startDate, params.endDate);
        break;
      case 'getRecentSales':
        result = getRecentSales(params.limit || 10);
        break;

      // Analytics
      case 'getDailyEarnings':
        result = getDailyEarnings();
        break;
      case 'getWeeklyEarnings':
        result = getWeeklyEarnings();
        break;
      case 'getMonthlyEarnings':
        result = getMonthlyEarnings();
        break;
      case 'getEarningsByDays':
        result = getEarningsByDays(params.days || 7);
        break;

      default:
        result = { success: false, message: 'Ação não reconhecida' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro no servidor: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Inclui arquivos HTML/CSS/JS
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Obtém URL da Web App
 */
function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}
