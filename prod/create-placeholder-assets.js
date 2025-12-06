/**
 * Create Placeholder Assets Script
 * Generates placeholder images and documents for YPI Website
 * 
 * Purpose: Prevent 404 errors during development/review
 * Note: Replace with real assets before production launch
 * 
 * Usage: node create-placeholder-assets.js
 */

const fs = require('fs');
const path = require('path');

// Color scheme
const COLORS = {
  primary: '#FDB714',   // YPI Gold
  secondary: '#003B5C', // YPI Navy
  text: '#FFFFFF',
  placeholder: '#E5E7EB'
};

/**
 * Create directory if it doesn't exist
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  } else {
    console.log(`📁 Directory exists: ${dirPath}`);
  }
}

/**
 * Generate placeholder SVG image
 */
function generatePlaceholderSVG(filename, width, height, category) {
  const text = filename.replace(/\.(jpg|png|jpeg)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${COLORS.placeholder}"/>
  <rect x="0" y="0" width="100%" height="8" fill="${COLORS.primary}"/>
  <text 
    x="50%" 
    y="45%" 
    font-family="Arial, sans-serif" 
    font-size="24" 
    font-weight="bold" 
    fill="${COLORS.secondary}" 
    text-anchor="middle"
    dominant-baseline="middle">
    ${text}
  </text>
  <text 
    x="50%" 
    y="55%" 
    font-family="Arial, sans-serif" 
    font-size="16" 
    fill="${COLORS.secondary}" 
    text-anchor="middle"
    dominant-baseline="middle">
    [${category}] ${width}x${height}px
  </text>
  <text 
    x="50%" 
    y="65%" 
    font-family="Arial, sans-serif" 
    font-size="14" 
    fill="#6B7280" 
    text-anchor="middle"
    dominant-baseline="middle">
    PLACEHOLDER - Replace with actual image
  </text>
  <circle cx="50%" cy="75%" r="30" fill="${COLORS.primary}" opacity="0.3"/>
  <path d="M ${width/2-15} ${height*0.75-10} L ${width/2} ${height*0.75+10} L ${width/2+15} ${height*0.75-10}" 
    stroke="${COLORS.secondary}" stroke-width="3" fill="none"/>
</svg>`;
}

/**
 * Generate placeholder PDF content (text file with .pdf extension)
 */
function generatePlaceholderPDF(filename, category, description) {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
/F2 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj

4 0 obj
<<
/Length 500
>>
stream
BT
/F1 18 Tf
50 750 Td
(Yellow Power International) Tj
0 -30 Td
/F1 14 Tf
(${filename}) Tj
0 -40 Td
/F2 12 Tf
(Category: ${category}) Tj
0 -25 Td
(${description}) Tj
0 -40 Td
(PLACEHOLDER DOCUMENT) Tj
0 -25 Td
(This is a placeholder document for development purposes.) Tj
0 -20 Td
(Replace with actual professional document before production.) Tj
0 -40 Td
/F1 12 Tf
(Required Content:) Tj
0 -20 Td
/F2 10 Tf
(- Professional branding and layout) Tj
0 -15 Td
(- Comprehensive service/company information) Tj
0 -15 Td
(- High-quality images and graphics) Tj
0 -15 Td
(- Contact information and CTAs) Tj
0 -15 Td
(- Legal disclaimers and certifications) Tj
0 -40 Td
/F2 8 Tf
(Generated: ${new Date().toISOString()}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000344 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
894
%%EOF`;
}

/**
 * Create README for a directory
 */
function createDirectoryReadme(dirPath, category, description, fileList) {
  const readmePath = path.join(dirPath, 'README.md');
  const content = `# ${category}

${description}

## Required Files

${fileList.map(f => `- \`${f}\` - ${f.replace(/[-_]/g, ' ').replace(/\.(jpg|png|pdf)$/i, '')}`).join('\n')}

## Status

🔴 **PLACEHOLDER FILES** - Replace with actual assets before production

## Specifications

See \`/prod/CONTENT_ASSET_MANIFEST.md\` for detailed specifications.

## Upload Instructions

1. Prepare high-quality assets matching the specifications
2. Name files exactly as listed above
3. Optimize file sizes
4. Replace placeholder files in this directory
5. Verify on development server
6. Test that no 404 errors occur

**Last Updated:** ${new Date().toLocaleDateString()}
`;
  
  fs.writeFileSync(readmePath, content);
  console.log(`📝 Created README: ${readmePath}`);
}

// ==============================================================================
// IMAGE ASSETS CONFIGURATION
// ==============================================================================

const imageAssets = {
  'projects': {
    description: 'Project site photographs showing equipment and operations',
    dimensions: [1920, 1080],
    files: [
      'tarkwa-1.jpg',
      'tarkwa-2.jpg',
      'tarkwa-3.jpg',
      'obuasi-1.jpg',
      'obuasi-2.jpg',
      'banfora-1.jpg',
      'sikasso-1.jpg',
      'lomero-1.jpg'
    ]
  },
  'clients': {
    description: 'Client company logos (PNG with transparency)',
    dimensions: [400, 200],
    files: [
      'goldfields.png',
      'anglogold.png',
      'newmont.png',
      'asanko.png',
      'perseus.png',
      'war.png'
    ]
  },
  'news': {
    description: 'News article hero images (Open Graph optimized)',
    dimensions: [1200, 630],
    files: [
      'tarkwa-project.jpg',
      'new-equipment.jpg',
      'excellence-award.jpg',
      'burkina-faso-launch.jpg',
      'rc-drilling.jpg',
      'iso-certification.jpg'
    ]
  },
  'gallery': {
    description: 'Gallery photos of equipment, projects, team, and facilities',
    dimensions: [1600, 900],
    files: [
      'sandvik-drill-rig.jpg',
      'cat-haul-trucks.jpg',
      'rc-drilling-site.jpg',
      'komatsu-excavator.jpg',
      'tarkwa-project.jpg',
      'obuasi-project.jpg',
      'northern-exploration.jpg',
      'burkina-project.jpg',
      'drill-operators.jpg',
      'engineering-team.jpg',
      'safety-training.jpg',
      'school-project.jpg',
      'healthcare-support.jpg',
      'water-project.jpg',
      'head-office.jpg',
      'workshop.jpg'
    ]
  },
  'csr': {
    description: 'CSR project photos showing community impact',
    dimensions: [1200, 800],
    files: [
      'school-renovation.jpg',
      'healthcare-donation.jpg',
      'water-project.jpg',
      'youth-training.jpg',
      'reforestation.jpg',
      'mobile-clinic.jpg'
    ]
  },
  'testimonials': {
    description: 'Photos of employees, clients, and community members',
    dimensions: [800, 800],
    files: [
      'john-mensah.jpg',
      'sarah-osei.jpg',
      'client-boateng.jpg',
      'chief-addo.jpg',
      'trainee-appiah.jpg',
      'ama-frimpong.jpg',
      'akosua.jpg',
      'kwame.jpg',
      'abena.jpg',
      'ibrahim.jpg',
      'chief-kofi.jpg',
      'michael.jpg',
      'sarah.jpg',
      'emmanuel.jpg',
      'fatou.jpg'
    ]
  },
  'videos': {
    description: 'Video thumbnail images (16:9 aspect ratio)',
    dimensions: [1280, 720],
    files: [
      'company-overview-thumb.jpg',
      'sandvik-drill-thumb.jpg',
      'tarkwa-project-thumb.jpg',
      'drill-operator-thumb.jpg',
      'rc-drilling-thumb.jpg',
      'education-csr-thumb.jpg',
      'safety-culture-thumb.jpg',
      'load-haul-thumb.jpg'
    ]
  }
};

// ==============================================================================
// DOCUMENT ASSETS CONFIGURATION
// ==============================================================================

const documentAssets = {
  'services': {
    description: 'Service brochures and equipment catalogs',
    files: [
      {
        name: 'production-drilling-brochure.pdf',
        desc: 'Production Drilling Services - Comprehensive brochure'
      },
      {
        name: 'pre-split-drilling-brochure.pdf',
        desc: 'Pre-Split Drilling Services - Comprehensive brochure'
      },
      {
        name: 'rc-drilling-brochure.pdf',
        desc: 'Reverse Circulation Drilling Services brochure'
      },
      {
        name: 'load-haul-brochure.pdf',
        desc: 'Load & Haul Operations brochure'
      },
      {
        name: 'construction-services-brochure.pdf',
        desc: 'Mining Construction Services brochure'
      },
      {
        name: 'equipment-catalog.pdf',
        desc: 'Complete Equipment Catalog'
      }
    ]
  },
  'company': {
    description: 'Company profile and policy documents',
    files: [
      {
        name: 'company-profile.pdf',
        desc: 'Yellow Power International - Company Profile'
      },
      {
        name: 'capabilities-statement.pdf',
        desc: 'Capabilities Statement'
      },
      {
        name: 'safety-policy.pdf',
        desc: 'Health & Safety Policy'
      },
      {
        name: 'environmental-policy.pdf',
        desc: 'Environmental Management Policy'
      },
      {
        name: 'quality-certifications.pdf',
        desc: 'ISO Certifications and Quality Standards'
      }
    ]
  },
  'newsletters': {
    description: 'Monthly newsletter archive',
    files: [
      {
        name: 'ypi-newsletter-2024-12.pdf',
        desc: 'December 2024 Newsletter'
      },
      {
        name: 'ypi-newsletter-2024-11.pdf',
        desc: 'November 2024 Newsletter'
      },
      {
        name: 'ypi-newsletter-2024-10.pdf',
        desc: 'October 2024 Newsletter'
      },
      {
        name: 'ypi-newsletter-2024-09.pdf',
        desc: 'September 2024 Newsletter'
      },
      {
        name: 'ypi-newsletter-2024-08.pdf',
        desc: 'August 2024 Newsletter'
      },
      {
        name: 'ypi-newsletter-2024-07.pdf',
        desc: 'July 2024 Newsletter'
      }
    ]
  }
};

// ==============================================================================
// MAIN EXECUTION
// ==============================================================================

function main() {
  console.log('🚀 Starting placeholder asset creation...\n');
  
  const baseDir = path.join(__dirname, '..', 'dev', 'public');
  const imagesDir = path.join(baseDir, 'images');
  const documentsDir = path.join(baseDir, 'documents');
  
  let imageCount = 0;
  let docCount = 0;
  
  // Create image directories and placeholders
  console.log('📸 Creating image placeholders...\n');
  
  Object.entries(imageAssets).forEach(([category, config]) => {
    const categoryDir = path.join(imagesDir, category);
    ensureDir(categoryDir);
    
    config.files.forEach(filename => {
      const filePath = path.join(categoryDir, filename);
      const [width, height] = config.dimensions;
      const svg = generatePlaceholderSVG(filename, width, height, category);
      
      // Save as SVG (easier to generate, can be replaced with JPG/PNG later)
      const svgPath = filePath.replace(/\.(jpg|png)$/i, '.svg');
      fs.writeFileSync(svgPath, svg);
      console.log(`  ✅ ${category}/${filename.replace(/\.(jpg|png)$/i, '.svg')}`);
      imageCount++;
    });
    
    createDirectoryReadme(categoryDir, category.toUpperCase(), config.description, config.files);
    console.log('');
  });
  
  // Create document directories and placeholders
  console.log('📄 Creating document placeholders...\n');
  
  Object.entries(documentAssets).forEach(([category, config]) => {
    const categoryDir = path.join(documentsDir, category);
    ensureDir(categoryDir);
    
    config.files.forEach(({ name, desc }) => {
      const filePath = path.join(categoryDir, name);
      const pdf = generatePlaceholderPDF(name, category, desc);
      
      fs.writeFileSync(filePath, pdf);
      console.log(`  ✅ ${category}/${name}`);
      docCount++;
    });
    
    createDirectoryReadme(
      categoryDir,
      category.toUpperCase(),
      config.description,
      config.files.map(f => f.name)
    );
    console.log('');
  });
  
  // Create main README
  const mainReadme = path.join(baseDir, 'README.md');
  const mainReadmeContent = `# Public Assets Directory

This directory contains all public-facing media assets and downloadable documents for the YPI website.

## 🔴 IMPORTANT: PLACEHOLDER ASSETS

**Current Status:** This directory contains **PLACEHOLDER FILES ONLY**

All images are SVG placeholders and all PDFs are minimal placeholders. These **MUST** be replaced with actual professional assets before production launch.

## Directory Structure

\`\`\`
public/
├── images/              ${imageCount} image placeholders
│   ├── projects/        Project site photographs (8 files)
│   ├── clients/         Client company logos (6 files)
│   ├── news/            News article images (6 files)
│   ├── gallery/         Gallery photos (16 files)
│   ├── csr/             CSR project photos (6 files)
│   ├── testimonials/    People photos (15 files)
│   └── videos/          Video thumbnails (8 files)
│
└── documents/           ${docCount} document placeholders
    ├── services/        Service brochures (6 PDFs)
    ├── company/         Company documents (5 PDFs)
    └── newsletters/     Newsletter archive (6 PDFs)
\`\`\`

## 📋 Asset Requirements

See **\`/prod/CONTENT_ASSET_MANIFEST.md\`** for complete specifications including:
- Exact file names required
- Dimensions and file sizes
- Content requirements
- Optimization guidelines
- Privacy and licensing considerations

## 🚀 Replacement Process

1. Review \`CONTENT_ASSET_MANIFEST.md\` for specifications
2. Prepare professional assets matching requirements
3. Optimize file sizes
4. Replace placeholder files (keep exact filenames)
5. Test on development server
6. Verify no 404 errors

## ⚠️ Production Checklist

Before launching to production:

- [ ] All image placeholders replaced with real photos
- [ ] All PDF placeholders replaced with professional documents
- [ ] Client logos properly licensed
- [ ] Individual photo consent obtained
- [ ] File sizes optimized
- [ ] All assets tested
- [ ] No 404 errors

## 📊 Progress: 0% Complete

**Status:** 🔴 Placeholders only - Real assets required

---

**Generated:** ${new Date().toLocaleString()}  
**Script:** \`prod/create-placeholder-assets.js\`
`;
  
  fs.writeFileSync(mainReadme, mainReadmeContent);
  console.log(`📝 Created main README: ${mainReadme}\n`);
  
  // Summary
  console.log('═'.repeat(60));
  console.log('✅ PLACEHOLDER ASSET CREATION COMPLETE\n');
  console.log(`📸 Images created: ${imageCount} placeholder SVG files`);
  console.log(`📄 Documents created: ${docCount} placeholder PDF files`);
  console.log(`📝 README files: ${Object.keys(imageAssets).length + Object.keys(documentAssets).length + 1}`);
  console.log('\n⚠️  IMPORTANT: These are PLACEHOLDERS ONLY');
  console.log('Replace with real assets before production launch\n');
  console.log('See prod/CONTENT_ASSET_MANIFEST.md for requirements');
  console.log('═'.repeat(60));
}

// Run if called directly
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { main };
