const fs = require('fs');
const path = require('path');

function parseCSV(content) {
    const lines = content.split('\n');
    const header = lines[0].split(',');
    
    // Find relevant columns
    const titleIdx = header.indexOf('data');
    const priceIdx = header.indexOf('price');
    const imageIdx = header.indexOf('image');
    
    const products = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Simple CSV parser for quoted fields
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (!row || row.length < 10) continue;
        
        let title = (row[titleIdx] || '').replace(/"/g, '').trim();
        let rawPrice = (row[priceIdx] || '').replace(/"/g, '').trim();
        let imageUrl = (row[imageIdx] || '').replace(/"/g, '').trim();
        
        if (!title || !rawPrice) continue;
        
        // Price transformation: Extract first number, e.g., "$0.80-10" -> 0.80
        const priceMatch = rawPrice.match(/[\d.]+/);
        if (!priceMatch) continue;
        
        const originalPrice = parseFloat(priceMatch[0]);
        // Apply 95% markup
        const price = (originalPrice * 1.95).toFixed(2);
        const displayOriginalPrice = (originalPrice * 2.5).toFixed(2); // Mocked original price for "Sale" look

        // Categorization
        let category = 'educational'; // default
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('plush') || lowerTitle.includes('soft') || lowerTitle.includes('stuffed')) category = 'plush';
        else if (lowerTitle.includes('outdoor') || lowerTitle.includes('ball') || lowerTitle.includes('sports')) category = 'outdoor';
        else if (lowerTitle.includes('board') || lowerTitle.includes('game') || lowerTitle.includes('puzzle')) category = 'board';
        else if (lowerTitle.includes('art') || lowerTitle.includes('clay') || lowerTitle.includes('diy') || lowerTitle.includes('creative')) category = 'creative';
        
        // Emoji based on category
        const emojis = {
            plush: '🧸',
            outdoor: '⚽',
            board: '🎲',
            creative: '🎨',
            educational: '🧪'
        };

        products.push({
            id: 'item-' + Math.random().toString(36).substr(2, 9),
            name: title.length > 60 ? title.substring(0, 57) + '...' : title,
            fullName: title,
            price: parseFloat(price),
            originalPrice: parseFloat(displayOriginalPrice),
            emoji: emojis[category] || '📦',
            category: category,
            image: imageUrl,
            rating: (4 + Math.random()).toFixed(1),
            reviews: Math.floor(Math.random() * 500) + 10
        });
    }
    return products;
}

const directory = './';
const files = fs.readdirSync(directory).filter(f => f.startsWith('alibaba-com-') && f.endsWith('.csv'));

let allProducts = [];
console.log(`🔍 Found ${files.length} inventory files.`);

files.forEach(file => {
    const content = fs.readFileSync(path.join(directory, file), 'utf-8');
    const products = parseCSV(content);
    allProducts = allProducts.concat(products);
    console.log(`✅ Processed ${file}: ${products.length} items found.`);
});

// Final output
const outputContent = `/* Generated Inventory Data */
const PRODUCTS_DATA = ${JSON.stringify(allProducts, null, 2)};
if (typeof module !== 'undefined') module.exports = PRODUCTS_DATA;`;

fs.writeFileSync('./js/data.js', outputContent);
console.log(`\n✨ Successfully integrated ${allProducts.length} total products to js/data.js`);
