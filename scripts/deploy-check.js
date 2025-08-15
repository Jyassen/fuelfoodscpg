#!/usr/bin/env node

/**
 * Deployment Readiness Check Script
 *
 * This script verifies that the FuelFoods application is ready for deployment
 * by checking environment variables, build configuration, and potential issues.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} exists`, 'green');
    return true;
  } else {
    log(`❌ ${description} missing: ${filePath}`, 'red');
    return false;
  }
}

function checkEnvironmentVariables() {
  log('\n🔍 Checking Environment Variables...', 'cyan');

  const requiredVars = ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_SITE_NAME'];

  const recommendedVars = [
    'NEXT_PUBLIC_IMAGES_BASE_URL',
    'NEXT_PUBLIC_META_TITLE',
    'NEXT_PUBLIC_META_DESCRIPTION',
  ];

  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envLocalPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envExamplePath)) {
    log('❌ .env.example file missing', 'red');
    return false;
  }

  log('✅ .env.example file exists', 'green');

  if (fs.existsSync(envLocalPath)) {
    log('✅ .env.local file exists', 'green');
  } else {
    log('⚠️  .env.local file missing (copy from .env.example)', 'yellow');
  }

  // Check if required variables are documented
  const envContent = fs.readFileSync(envExamplePath, 'utf8');

  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      log(`✅ ${varName} documented in .env.example`, 'green');
    } else {
      log(`❌ ${varName} missing from .env.example`, 'red');
    }
  });

  recommendedVars.forEach(varName => {
    if (envContent.includes(varName)) {
      log(`✅ ${varName} documented in .env.example`, 'green');
    } else {
      log(`⚠️  ${varName} recommended but missing from .env.example`, 'yellow');
    }
  });

  return true;
}

function checkDeploymentFiles() {
  log('\n🚀 Checking Deployment Configuration Files...', 'cyan');

  const deploymentConfigs = [
    { path: 'vercel.json', description: 'Vercel configuration' },
    { path: 'netlify.toml', description: 'Netlify configuration' },
    { path: '_redirects', description: 'Netlify redirects' },
    { path: 'DEPLOYMENT.md', description: 'Deployment documentation' },
  ];

  let allExist = true;

  deploymentConfigs.forEach(config => {
    const exists = checkFileExists(
      path.join(process.cwd(), config.path),
      config.description
    );
    if (!exists) allExist = false;
  });

  return allExist;
}

function checkBuildConfiguration() {
  log('\n⚙️  Checking Build Configuration...', 'cyan');

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');

  if (!fs.existsSync(packageJsonPath)) {
    log('❌ package.json missing', 'red');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Check required scripts
  const requiredScripts = ['build', 'start', 'dev', 'lint'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      log(`✅ Script "${script}" defined`, 'green');
    } else {
      log(`❌ Script "${script}" missing`, 'red');
    }
  });

  // Check Next.js config
  if (fs.existsSync(nextConfigPath)) {
    log('✅ next.config.ts exists', 'green');
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

    if (nextConfig.includes('output:')) {
      log('✅ Output configuration found', 'green');
    } else {
      log('⚠️  Output configuration not found', 'yellow');
    }
  } else {
    log('❌ next.config.ts missing', 'red');
  }

  return true;
}

function checkImageOptimization() {
  log('\n🖼️  Checking Image Configuration...', 'cyan');

  const publicImagesPath = path.join(process.cwd(), 'public', 'images');

  if (!fs.existsSync(publicImagesPath)) {
    log('❌ /public/images directory missing', 'red');
    return false;
  }

  log('✅ /public/images directory exists', 'green');

  // Count images
  const imageFiles = fs
    .readdirSync(publicImagesPath)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(file));

  log(`📊 Found ${imageFiles.length} image files`, 'blue');

  // Check for large images
  const largeImages = imageFiles.filter(file => {
    const filePath = path.join(publicImagesPath, file);
    const stats = fs.statSync(filePath);
    return stats.size > 500000; // 500KB
  });

  if (largeImages.length > 0) {
    log(`⚠️  ${largeImages.length} images are larger than 500KB:`, 'yellow');
    largeImages.forEach(file => {
      const filePath = path.join(publicImagesPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      log(`   - ${file} (${sizeKB}KB)`, 'yellow');
    });
  } else {
    log('✅ All images are under 500KB', 'green');
  }

  return true;
}

function checkLintingAndFormatting() {
  log('\n🧹 Checking Code Quality Configuration...', 'cyan');

  const eslintConfigPath = path.join(process.cwd(), 'eslint.config.mjs');
  const prettierConfigPath = path.join(process.cwd(), '.prettierrc');
  const prettierIgnorePath = path.join(process.cwd(), '.prettierignore');

  let allGood = true;

  if (!checkFileExists(eslintConfigPath, 'ESLint configuration')) {
    allGood = false;
  }

  if (!checkFileExists(prettierConfigPath, 'Prettier configuration')) {
    allGood = false;
  }

  if (!checkFileExists(prettierIgnorePath, 'Prettier ignore file')) {
    allGood = false;
  }

  return allGood;
}

function checkSEOConfiguration() {
  log('\n🔍 Checking SEO Configuration...', 'cyan');

  const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx');

  if (!fs.existsSync(layoutPath)) {
    log('❌ layout.tsx missing', 'red');
    return false;
  }

  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  const seoChecks = [
    { check: 'export const metadata', description: 'Metadata export' },
    { check: 'openGraph', description: 'Open Graph configuration' },
    { check: 'twitter', description: 'Twitter card configuration' },
  ];

  seoChecks.forEach(({ check, description }) => {
    if (layoutContent.includes(check)) {
      log(`✅ ${description} found`, 'green');
    } else {
      log(`⚠️  ${description} missing`, 'yellow');
    }
  });

  return true;
}

function generateDeploymentSummary() {
  log('\n📋 Deployment Summary', 'magenta');
  log('═'.repeat(50), 'magenta');

  const recommendations = [
    '1. Update NEXT_PUBLIC_SITE_URL in production environment',
    '2. Set up custom domain in hosting platform',
    '3. Configure environment variables in deployment platform',
    '4. Test build locally with: npm run build',
    '5. Verify all images load correctly in production',
    '6. Set up analytics and monitoring',
    '7. Configure SSL certificate',
    '8. Test forms and contact functionality',
  ];

  log('\n📝 Pre-deployment Checklist:', 'blue');
  recommendations.forEach(rec => log(`   ${rec}`, 'white'));

  log('\n🚀 Ready to Deploy!', 'green');
  log('   • Vercel: vercel --prod', 'white');
  log('   • Netlify: netlify deploy --prod', 'white');
  log('   • Or use the deployment buttons in DEPLOYMENT.md', 'white');
}

// Main execution
function main() {
  log('🔍 FuelFoods Deployment Readiness Check', 'cyan');
  log('═'.repeat(50), 'cyan');

  const checks = [
    checkEnvironmentVariables,
    checkDeploymentFiles,
    checkBuildConfiguration,
    checkImageOptimization,
    checkLintingAndFormatting,
    checkSEOConfiguration,
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      const result = check();
      if (!result) allPassed = false;
    } catch (error) {
      log(`❌ Error during check: ${error.message}`, 'red');
      allPassed = false;
    }
  }

  log('\n' + '═'.repeat(50), 'cyan');

  if (allPassed) {
    log('🎉 All checks passed! Ready for deployment.', 'green');
  } else {
    log(
      '⚠️  Some issues found. Please review and fix before deploying.',
      'yellow'
    );
  }

  generateDeploymentSummary();
}

// Run the checks
main();
