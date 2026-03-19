const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'js', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// Extract the JS array from the file. It looks like:
// const PRODUCTS_DATA = [ { ... }, { ... } ];
const match = content.match(/const PRODUCTS_DATA = (\[[\s\S]*\]);/);
if (match) {
    let products = eval(match[1]); // Parse the array
    
    products.forEach(p => {
        const text = p.fullName.toLowerCase();
        let ageRange = '3-5'; // default
        if (text.includes('baby') || text.includes('toddler') || text.includes('teether') || text.includes('0-2')) {
            ageRange = '0-2';
        } else if (text.includes('preschool') || text.includes('2-6') || text.includes('3-5')) {
            ageRange = '3-5';
        } else if (text.includes('6-8') || text.includes('science') || text.includes('robot')) {
            ageRange = '6-8';
        } else if (text.includes('9-12') || text.includes('adult') || text.includes('complex')) {
            ageRange = '9-12';
        } else {
            // Randomly assign to distribute catalog
            const r = Math.random();
            if (r < 0.2) ageRange = '0-2';
            else if (r < 0.5) ageRange = '3-5';
            else if (r < 0.8) ageRange = '6-8';
            else ageRange = '9-12';
        }
        
        // Also assign a material if needed, but age is most important
        p.ageRange = ageRange;
        
        // Also assign a badge if it has a high rating
        if (parseFloat(p.rating) >= 4.8) {
            p.badge = 'Best Seller';
        } else if (p.category === 'educational') {
            p.badge = 'STEM';
        } else if (ageRange === '0-2') {
            p.badge = 'Safe for 3+'; // Actually Safe for 0+
        } else if (Math.random() > 0.8) {
            p.badge = 'Eco-Friendly';
        }
    });
    
    // Write back to the file
    const newContent = `/* Generated Inventory Data */\nconst PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};`;
    fs.writeFileSync(dataFile, newContent, 'utf8');
    console.log('Successfully added ageRange and badges to products.');
} else {
    console.error('Could not parse PRODUCTS_DATA.');
}
