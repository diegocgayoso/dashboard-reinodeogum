/**
 * Script para gerar dados fictícios de teste
 */
function createMockData() {
    const products = [
        {
            name: 'Smartphone Galaxy S23',
            description: 'Smartphone Samsung Galaxy S23 128GB',
            sku: 'PHONE-001',
            price: 3500.00,
            stock: 50
        },
        {
            name: 'Notebook Dell Inspiron',
            description: 'Notebook Dell Inspiron i5 8GB 256GB SSD',
            sku: 'NOTE-002',
            price: 4200.00,
            stock: 30
        },
        {
            name: 'Fone de Ouvido Bluetooth',
            description: 'Fone de Ouvido Bluetooth JBL Tune',
            sku: 'AUDIO-003',
            price: 250.00,
            stock: 100
        },
        {
            name: 'Monitor Gamer 24"',
            description: 'Monitor Gamer Samsung 24 polegadas 75Hz',
            sku: 'MON-004',
            price: 899.00,
            stock: 20
        },
        {
            name: 'Teclado Mecânico RGB',
            description: 'Teclado Mecânico Redragon Kumara',
            sku: 'PERIF-005',
            price: 299.00,
            stock: 45
        }
    ];

    const createdProducts = [];

    // Criar Produtos
    console.log('Iniciando criação de produtos...');
    for (const product of products) {
        try {
            // Tenta adicionar o produto
            // Se der erro de SKU duplicado, tentamos buscar o produto existente (simulação)
            // Na implementação atual, addProduct lança erro se SKU existe.

            const result = addProduct(product);
            if (result.success) {
                console.log(`Produto criado: ${product.name} (ID: ${result.product.id})`);
                createdProducts.push(result.product);
            } else {
                console.error(`Erro ao criar produto ${product.name}: ${result.message}`);
                // Se falhar (ex: SKU já existe), vamos tentar pegar o produto da planilha para poder criar vendas
                // Isso é uma melhoria para evitar falha total se rodar o script 2 vezes
                const allProducts = getProducts().products;
                const existing = allProducts.find(p => p.sku === product.sku);
                if (existing) {
                    console.log(`Produto já existente encontrado: ${existing.name}`);
                    createdProducts.push(existing);
                }
            }
        } catch (e) {
            console.error(`Exceção ao criar produto ${product.name}: ${e.message}`);
        }
    }

    if (createdProducts.length === 0) {
        console.error('Nenhum produto disponível para criar vendas.');
        return;
    }

    // Criar Vendas
    console.log('Iniciando criação de vendas...');

    // Vamos criar 5 vendas distribuídas entre os produtos criados
    const salesData = [
        {
            productIndex: 0, // Smartphone
            quantity: 2
        },
        {
            productIndex: 1, // Notebook
            quantity: 1
        },
        {
            productIndex: 2, // Fone
            quantity: 5
        },
        {
            productIndex: 3, // Monitor
            quantity: 2
        },
        {
            productIndex: 4, // Teclado
            quantity: 3
        }
    ];

    for (const sale of salesData) {
        // Verifica se o produto existe no array de criados (pode ser que algum falhou ou não existia índice)
        if (sale.productIndex < createdProducts.length) {
            const product = createdProducts[sale.productIndex];

            const saleRequest = {
                productId: product.id,
                quantity: sale.quantity
            };

            try {
                const result = addSale(saleRequest);
                if (result.success) {
                    console.log(`Venda criada: ${sale.quantity}x ${product.name} - Total: R$ ${result.sale.totalValue}`);
                } else {
                    console.error(`Erro ao criar venda para ${product.name}: ${result.message}`);
                }
            } catch (e) {
                console.error(`Exceção ao criar venda: ${e.message}`);
            }
        }
    }

    console.log('Processo finalizado.');
}
