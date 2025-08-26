#!/usr/bin/env node
// css-duplicate-detector.js - Run with: node css-duplicate-detector.js

const fs = require('fs');
const path = require('path');

function detectDuplicateCSS(directory = 'src') {
  const cssFiles = [];
  
  // Recursively find CSS files
  function findCSSFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findCSSFiles(filePath);
      } else if (file.endsWith('.css')) {
        cssFiles.push(filePath);
      }
    });
  }

  try {
    findCSSFiles(directory);
  } catch (error) {
    console.log('Directory not found, checking current directory...');
    return;
  }

  const selectors = new Map();
  const duplicates = [];

  cssFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      // Match CSS selectors (class, id, element, pseudo)
      const selectorRegex = /([.#]?[\w-]+(?:\s*[>+~]\s*[\w.-]+)*(?:::?[\w-]+)?)\s*{[^}]*}/g;
      
      let match;
      while ((match = selectorRegex.exec(content)) !== null) {
        const selector = match[1].trim();
        
        // Skip empty selectors or comments
        if (!selector || selector.startsWith('/*')) continue;
        
        if (selectors.has(selector)) {
          selectors.get(selector).count++;
          selectors.get(selector).files.add(file);
        } else {
          selectors.set(selector, { count: 1, files: new Set([file]) });
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read file ${file}`);
    }
  });

  // Find duplicates
  selectors.forEach((data, selector) => {
    if (data.count > 1 || data.files.size > 1) {
      duplicates.push({
        selector,
        count: data.count,
        files: Array.from(data.files)
      });
    }
  });

  // Report results
  console.log(`\n🔍 CSS Duplicate Detection Report`);
  console.log(`📁 Scanned ${cssFiles.length} CSS files in ${directory}/`);
  
  if (duplicates.length > 0) {
    console.log(`\n🚨 Found ${duplicates.length} duplicate CSS selectors:\n`);
    duplicates.forEach((dup, index) => {
      console.log(`${index + 1}. ${dup.selector}`);
      console.log(`   Count: ${dup.count} occurrences`);
      console.log(`   Files: ${dup.files.join(', ')}`);
      console.log('');
    });
    
    console.log('💡 Consider consolidating these selectors to reduce bundle size.');
    process.exit(1);
  } else {
    console.log('✅ No duplicate CSS selectors found!');
    console.log('🎉 Your CSS is clean and optimized.');
  }
}

// Run the detector
detectDuplicateCSS();