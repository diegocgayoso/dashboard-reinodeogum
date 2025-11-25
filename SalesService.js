/**
 * Serviço de gerenciamento de vendas
 */

/**
 * Adiciona uma nova venda
 */
function addSale(saleData) {
  try {
    const sheets = initializeSheets();
    const salesSheet = sheets.salesSheet;
    
    // Validações
    if (!saleData.productId) {
      throw new Error('Produto é obrigatório');
    }
    
    if (!saleData.quantity || saleData.quantity <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }
    
    // Buscar produto
    const product = getProductById(saleData.productId);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    
    // Verificar estoque
    if (product.stock < saleData.quantity) {
      throw new Error('Estoque insuficiente. Disponível: ' + product.stock);
    }
    
    const id = generateId();
    const now = new Date();
    const quantity = parseInt(saleData.quantity);
    const unitPrice = parseFloat(product.price);
    const totalValue = quantity * unitPrice;
    
    const row = [
      id,
      now,
      product.name,
      product.sku,
      quantity,
      unitPrice,
      totalValue
    ];
    
    salesSheet.appendRow(row);
    
    // Atualizar estoque
    const stockResult = updateStock(saleData.productId, quantity, 'subtract');
    if (!stockResult.success) {
      throw new Error('Erro ao atualizar estoque: ' + stockResult.message);
    }
    
    return {
      success: true,
      message: 'Venda registrada com sucesso',
      sale: {
        id: id,
        date: formatDate(now),
        product: product.name,
        sku: product.sku,
        quantity: quantity,
        unitPrice: unitPrice,
        totalValue: totalValue,
        newStock: stockResult.newStock
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Lista todas as vendas
 */
function getSales(limit = 100) {
  try {
    const sheets = initializeSheets();
    const data = sheets.salesSheet.getDataRange().getValues();
    
    const sales = [];
    const startIndex = Math.max(1, data.length - limit);
    
    for (let i = data.length - 1; i >= startIndex; i--) {
      if (data[i][0]) { // Se tem ID
        sales.push({
          id: data[i][0],
          date: formatDate(data[i][1]),
          product: data[i][2],
          sku: data[i][3],
          quantity: data[i][4],
          unitPrice: data[i][5],
          totalValue: data[i][6]
        });
      }
    }
    
    return {
      success: true,
      sales: sales
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      sales: []
    };
  }
}

/**
 * Obtém vendas de um dia específico
 */
function getSalesByDate(dateStr) {
  try {
    const sheets = initializeSheets();
    const data = sheets.salesSheet.getDataRange().getValues();
    
    const targetDate = parseDate(dateStr);
    const bounds = getDayBounds(targetDate);
    
    const sales = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) {
        const saleDate = new Date(data[i][1]);
        if (saleDate >= bounds.start && saleDate <= bounds.end) {
          sales.push({
            id: data[i][0],
            date: formatDate(data[i][1]),
            product: data[i][2],
            sku: data[i][3],
            quantity: data[i][4],
            unitPrice: data[i][5],
            totalValue: data[i][6]
          });
        }
      }
    }
    
    return {
      success: true,
      sales: sales,
      date: formatDate(targetDate)
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      sales: []
    };
  }
}

/**
 * Obtém vendas de um período
 */
function getSalesByPeriod(startDateStr, endDateStr) {
  try {
    const sheets = initializeSheets();
    const data = sheets.salesSheet.getDataRange().getValues();
    
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    endDate.setHours(23, 59, 59, 999);
    
    const sales = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) {
        const saleDate = new Date(data[i][1]);
        if (saleDate >= startDate && saleDate <= endDate) {
          sales.push({
            id: data[i][0],
            date: formatDate(data[i][1]),
            product: data[i][2],
            sku: data[i][3],
            quantity: data[i][4],
            unitPrice: data[i][5],
            totalValue: data[i][6]
          });
        }
      }
    }
    
    return {
      success: true,
      sales: sales
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      sales: []
    };
  }
}

/**
 * Obtém últimas vendas
 */
function getRecentSales(limit = 10) {
  return getSales(limit);
}

/**
 * Calcula ganhos do dia atual
 */
function getDailyEarnings() {
  try {
    const today = new Date();
    const result = getSalesByDate(formatDate(today));
    
    let total = 0;
    let quantity = 0;
    
    if (result.success) {
      result.sales.forEach(sale => {
        total += sale.totalValue;
        quantity += sale.quantity;
      });
    }
    
    return {
      success: true,
      date: formatDate(today),
      earnings: total,
      salesCount: result.sales.length,
      itemsSold: quantity
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      earnings: 0
    };
  }
}

/**
 * Obtém ganhos dos últimos N dias
 */
function getEarningsByDays(days = 7) {
  try {
    const sheets = initializeSheets();
    const data = sheets.salesSheet.getDataRange().getValues();
    
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);
    
    // Objeto para armazenar ganhos por dia
    const earningsByDay = {};
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) {
        const saleDate = new Date(data[i][1]);
        if (saleDate >= startDate) {
          const dateKey = Utilities.formatDate(saleDate, Session.getScriptTimeZone(), 'yyyy-MM-dd');
          if (!earningsByDay[dateKey]) {
            earningsByDay[dateKey] = {
              date: dateKey,
              earnings: 0,
              salesCount: 0,
              itemsSold: 0
            };
          }
          earningsByDay[dateKey].earnings += data[i][6];
          earningsByDay[dateKey].salesCount++;
          earningsByDay[dateKey].itemsSold += data[i][4];
        }
      }
    }
    
    // Converter para array e ordenar por data
    const earningsArray = Object.values(earningsByDay).sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });
    
    // Calcular total
    let totalEarnings = 0;
    let totalSales = 0;
    let totalItems = 0;
    
    earningsArray.forEach(day => {
      totalEarnings += day.earnings;
      totalSales += day.salesCount;
      totalItems += day.itemsSold;
    });
    
    return {
      success: true,
      period: days + ' dias',
      dailyEarnings: earningsArray,
      summary: {
        totalEarnings: totalEarnings,
        totalSales: totalSales,
        totalItems: totalItems,
        averagePerDay: earningsArray.length > 0 ? totalEarnings / earningsArray.length : 0
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      dailyEarnings: []
    };
  }
}

/**
 * Obtém ganhos semanais
 */
function getWeeklyEarnings() {
  return getEarningsByDays(7);
}

/**
 * Obtém ganhos mensais
 */
function getMonthlyEarnings() {
  return getEarningsByDays(30);
}
