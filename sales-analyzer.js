const sales = [
    {
        product: 'T-shirt',
        category: 'Tops',
        price: 25, 
        quantity: 2, 
        salesperson: 'Alice',
        salesDate: '2024-06-01'
    },
    {
        product: 'Sneakers', 
        category: 'Footwear',
        price: 80, 
        quantity: 1, 
        salesperson: 'Bob',
        salesDate: '2024-06-02'
    },
    {
        product: 'Jeans', 
        category: 'Bottoms',
        price: 50, 
        quantity: 1, 
        salesperson: 'Charlie',
        salesDate: '2024-06-03'
    },
    {
        product: 'T-shirt',
        category: 'Tops',
        price: 25, 
        quantity: 3, 
        salesperson: 'Charlie',
        salesDate: '2024-06-03'
    },
    {
        product: 'Hat', 
        category: 'Accessories',
        price: 30, 
        quantity: 5, 
        salesperson: 'Alice',
        salesDate: '2024-06-04'
    },
    {
        product: 'Jacket', 
        category: 'Outerwear',
        price: 120, 
        quantity: 3, 
        salesperson: 'Bob',
        salesDate: '2024-06-05'
    },
    {
        product: 'Socks', 
        category: 'Accessories',
        price: 10, 
        quantity: 10, 
        salesperson: 'Charlie',
        salesDate: '2024-06-06'
    },
    {
        product: 'Belt',
        category: 'Accessories',
        price: 15, 
        quantity: 2, 
        salesperson: 'Alice',
        salesDate: '2024-06-07'
    },
    {
        product: 'Sweater', 
        category: 'Tops',
        price: 60, 
        quantity: 1, 
        salesperson: 'Bob',
        salesDate: '2024-06-08'
    },
    {
        product: 'Scarf', 
        category: 'Accessories',
        price: 20, 
        quantity: 4, 
        salesperson: 'Charlie',
        salesDate: '2024-06-09'
    },
    {
        product: 'Gloves', 
        category: 'Accessories',
        price: 25, 
        quantity: 3, 
        salesperson: 'Alice',
        salesDate: '2024-06-10'
    }
]

// Calculate total revenue
const totalRevenue = sales.reduce((total, sale) => {
    return total + sale.price * sale.quantity
}, 0)

// Calculate number of transactions
const totalTransactions = sales.length

// Calculate average transaction value
const averageTransaction = totalRevenue / totalTransactions

// Calculate each product with its total revenue
const productRevenue = sales.reduce((acc, sale) => {
    if (!acc[sale.product]) {
        acc[sale.product] = 0
    }
    acc[sale.product] += sale.price * sale.quantity
    return acc
}, {})

// Return the top 5 products
const topProducts = Object.entries(productRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([product, revenue]) => ({ product, revenue }))

// Return salesperson revenue
const salespersonRevenue = sales.reduce((top, sale) => {
    if (!top[sale.salesperson]) {
        top[sale.salesperson] = 0
    }
    top[sale.salesperson] += sale.price * sale.quantity
    return top
}, {})

// Return the top salesperson
const topSalespersonName = Object.keys(salespersonRevenue)
    .reduce((a, b) => salespersonRevenue[a] > salespersonRevenue[b] ? a : b)

// Return sales by day of the week and sort it by day number (0 = Sunday, 1 = Monday, etc.)
const salesByDay = Object.fromEntries(
    Object.entries(
        sales.reduce((acc, sale) => {
            const date = new Date(sale.salesDate)
            const day = date.toLocaleDateString('en-US', { weekday: 'long' })
            const dayNumber = date.getDay()
            if (!acc[day]) {
                acc[day] = {
                    dayNumber: dayNumber,
                    revenue: 0
                }
            }
            acc[day].revenue += sale.price * sale.quantity
            return acc
        }, {})
    ).sort(([, a], [, b]) => a.dayNumber - b.dayNumber)
)

// Return sales by category
const salesByCategory = sales.reduce((acc, sale) => {
    if (!acc[sale.category]) {
        acc[sale.category] = 0
    }
    acc[sale.category] += sale.price * sale.quantity
    return acc
}, {})

// Return the category with the highest revenue
const maxRevenue = Math.max(...Object.values(salesByCategory))
// Return the product with the highest revenue
const maxProductRevenue = Math.max(...Object.values(productRevenue))
// Return the day with the highest sales
const maxSales = Math.max(...Object.values(salesByDay).map(day => day.revenue))

console.log('Total revenue:', totalRevenue)
console.log('Transactions:', totalTransactions)
console.log('Average transaction:', averageTransaction)
console.log('Product revenue:', productRevenue)
console.log('Top products:', topProducts)
console.log('Salesperson revenue:', salespersonRevenue)
console.log('Top salesperson:', topSalespersonName)
console.log('Sales by day of the week:', salesByDay)
console.log('Sales by category:', salesByCategory)

document.getElementById('total-revenue').textContent =
    `$${totalRevenue}`;
document.getElementById('total-transactions').textContent =
    totalTransactions;
document.getElementById('average-transaction').textContent =
    `$${averageTransaction.toFixed(2)}`;
document.getElementById('top-product').textContent =
    `${topProducts[0].product}`;
document.getElementById('category-sales').innerHTML =
    Object.entries(salesByCategory)
        .map(([category, sales]) => {
            const percentage = (sales / maxRevenue) * 100
        return `
            <tr>
                <td class="category">${category}</td>
                <td class="bar-cell">
                    <div class="bar-container">
                        <div class="bar" style="width: ${percentage}%"></div>
                    </div>
                </td>
                <td class="sales">$${sales}</td>
            </tr>
        `})
        .join('');
document.getElementById('product-revenue').innerHTML =
    Object.entries(productRevenue)
        .map(([product, revenue]) => {
            const percentage = (revenue / maxProductRevenue) * 100
            return `
                <tr>
                    <td class="product">${product}</td>
                    <td class="bar-cell">
                        <div class="bar-container">
                            <div class="bar" style="width: ${percentage}%"></div>
                        </div>
                    </td>
                    <td class="revenue">$${revenue}</td>
                </tr>
            `})
        .join('');
document.getElementById('top-products').innerHTML =
    topProducts.map(({ product, revenue }) => {
        const percentage = (revenue / maxProductRevenue) * 100
        return `
            <tr>
                <td class="product">${product}</td>
                <td class="bar-cell">
                    <div class="bar-container">
                        <div class="bar" style="width: ${percentage}%"></div>
                    </div>
                </td>
                <td class="revenue">$${revenue}</td>
            </tr>
        `})
    .join('');
document.getElementById('seller-revenue').innerHTML =
    Object.entries(salespersonRevenue)
        .map(([salesperson, revenue]) => {
            const percentage = (revenue / salespersonRevenue[topSalespersonName]) * 100
            return `
                <tr>
                    <td class="salesperson">${salesperson}</td>
                    <td class="bar-cell">
                        <div class="bar-container">
                            <div class="bar" style="width: ${percentage}%"></div>
                        </div>
                    </td>
                    <td class="revenue">$${revenue}</td>
                </tr>
            `})
        .join('');  
document.getElementById('top-seller').innerHTML =
    `<span class="label">Top Seller:</span> ${topSalespersonName}`;
document.getElementById('daily-sales').innerHTML =
    Object.entries(salesByDay)
        .map(([day, data]) => {
            const percentage = (data.revenue / maxSales) * 100

            return `
                <tr>
                    <td class="day">${day}</td>
                    <td class="bar-cell">
                        <div class="bar-container">
                            <div class="bar" style="width: ${percentage}%"></div>
                        </div>
                    </td>
                    <td class="sales">$${data.revenue}</td>
                </tr>
            `
        })
        .join('')