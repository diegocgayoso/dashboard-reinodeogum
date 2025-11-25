/**
 * Serviço de gerenciamento de produtos
 */

/**
 * Adiciona um novo produto
 */
function addProduct(productData) {
  try {
    const sheets = initializeSheets();
    const productsSheet = sheets.productsSheet;
    
    // Validações
    if (!productData.name || productData.name.trim() === '') {
      throw new Error('Nome do produto é obrigatório');
    }
    
    if (!productData.sku || productData.sku.trim() === '') {
      throw new Error('SKU é obrigatório');
    }
    
    if (productData.price === undefined || productData.price < 0) {
      throw new Error('Preço deve ser maior ou igual a zero');
    }
    
    if (productData.stock === undefined || productData.stock < 0) {
      throw new Error('Estoque deve ser maior ou igual a zero');
    }
    
    // Verificar se SKU já existe
    const data = productsSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][3] === productData.sku) {
        throw new Error('SKU já existe no sistema');
      }
    }
    
    const id = generateId();
    const now = new Date();
    
    const row = [
      id,
      productData.name,
      productData.description || '',
      productData.sku,
      parseFloat(productData.price),
      parseInt(productData.stock),
      now
    ];
    
    productsSheet.appendRow(row);
    
    return {
      success: true,
      message: 'Produto cadastrado com sucesso',
      product: {
        id: id,
        name: productData.name,
        description: productData.description || '',
        sku: productData.sku,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        createdAt: formatDate(now)
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
 * Lista todos os produtos
 */
function getProducts() {
  try {
    const sheets = initializeSheets();
    const data = sheets.productsSheet.getDataRange().getValues();
    
    const products = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) { // Se tem ID
        products.push({
          id: data[i][0],
          name: data[i][1],
          description: data[i][2],
          sku: data[i][3],
          price: data[i][4],
          stock: data[i][5],
          createdAt: formatDate(data[i][6])
        });
      }
    }
    
    return {
      success: true,
      products: products
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      products: []
    };
  }
}

/**
 * Atualiza um produto existente
 */
function updateProduct(productId, productData) {
  try {
    const sheets = initializeSheets();
    const productsSheet = sheets.productsSheet;
    const data = productsSheet.getDataRange().getValues();
    
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === productId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      throw new Error('Produto não encontrado');
    }
    
    // Atualizar apenas os campos fornecidos
    if (productData.name !== undefined) {
      productsSheet.getRange(rowIndex, 2).setValue(productData.name);
    }
    if (productData.description !== undefined) {
      productsSheet.getRange(rowIndex, 3).setValue(productData.description);
    }
    if (productData.price !== undefined) {
      productsSheet.getRange(rowIndex, 5).setValue(parseFloat(productData.price));
    }
    if (productData.stock !== undefined) {
      productsSheet.getRange(rowIndex, 6).setValue(parseInt(productData.stock));
    }
    
    return {
      success: true,
      message: 'Produto atualizado com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Remove um produto
 */
function deleteProduct(productId) {
  try {
    const sheets = initializeSheets();
    const productsSheet = sheets.productsSheet;
    const data = productsSheet.getDataRange().getValues();
    
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === productId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      throw new Error('Produto não encontrado');
    }
    
    productsSheet.deleteRow(rowIndex);
    
    return {
      success: true,
      message: 'Produto removido com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Atualiza estoque de um produto
 */
function updateStock(productId, quantity, operation = 'set') {
  try {
    const product = getProductById(productId);
    
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    
    const sheets = initializeSheets();
    const productsSheet = sheets.productsSheet;
    
    let newStock;
    if (operation === 'add') {
      newStock = product.stock + parseInt(quantity);
    } else if (operation === 'subtract') {
      newStock = product.stock - parseInt(quantity);
      if (newStock < 0) {
        throw new Error('Estoque insuficiente');
      }
    } else {
      newStock = parseInt(quantity);
    }
    
    productsSheet.getRange(product.rowIndex, 6).setValue(newStock);
    
    return {
      success: true,
      message: 'Estoque atualizado com sucesso',
      newStock: newStock
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
