/**
 * Simple RapidAPI connectivity test
 * This will help diagnose the exact issue
 */

const fs = require('fs');
const path = require('path');

// Read .env.local for API key
const envPath = path.join(__dirname, '.env.local');
let RAPID_API_KEY;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('RAPID_API_KEY=')) {
      RAPID_API_KEY = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.log('❌ Cannot read .env.local');
  process.exit(1);
}

console.log('Diagnostic Test for RapidAPI\n');

if (!RAPID_API_KEY) {
  console.log('❌ RAPID_API_KEY not found in .env.local');
  console.log('\nPlease add: RAPID_API_KEY=your_key');
  process.exit(1);
}

console.log('✅ Found API key:', RAPID_API_KEY.substring(0, 10) + '...');
console.log('');

async function diagnose() {
  console.log('Testing basic connectivity...\n');
  
  // Test 1: Can we reach RapidAPI?
  console.log('TEST 1: Network connectivity');
  try {
    const testResponse = await fetch('https://jsearch.p.rapidapi.com');
    console.log('   Status:', testResponse.status);
    console.log('   ✅ Can reach RapidAPI servers\n');
  } catch (error) {
    console.log('   ❌ Cannot reach RapidAPI:', error.message);
    console.log('   Check your internet connection\n');
    return;
  }
  
  // Test 2: Is the API key valid?
  console.log('TEST 2: API key validation');
  const url = 'https://jsearch.p.rapidapi.com/search?query=developer&page=1&num_pages=1';
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
    
    console.log('   HTTP Status:', response.status);
    console.log('   Status Text:', response.statusText);
    
    const text = await response.text();
    
    if (response.status === 200) {
      console.log('   ✅ API key is VALID!\n');
      
      try {
        const data = JSON.parse(text);
        console.log('   Found', data.data?.length || 0, 'jobs');
        console.log('\n✅ JSEARCH API IS WORKING PERFECTLY!\n');
      } catch (e) {
        console.log('   Response:', text.substring(0, 200));
      }
    } else if (response.status === 401 || response.status === 403) {
      console.log('   ❌ Authentication failed');
      console.log('   Your API key might be invalid or expired\n');
      console.log('   Response:', text.substring(0, 300), '\n');
    } else if (response.status === 429) {
      console.log('   ⚠️  Rate limit exceeded');
      console.log('   Wait a few minutes or upgrade your plan\n');
    } else if (response.status === 402) {
      console.log('   ⚠️  Payment required');
      console.log('   You need to subscribe to a plan on RapidAPI\n');
      console.log('   Visit: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch');
      console.log('   Subscribe to the FREE plan (0$/month, 2500 requests)\n');
    } else {
      console.log('   ❌ Unexpected error');
      console.log('   Response:', text.substring(0, 300), '\n');
    }
    
  } catch (error) {
    console.log('   ❌ Request failed:', error.message, '\n');
  }
}

diagnose();
