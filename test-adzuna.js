const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let APP_ID, APP_KEY;
for (const line of envLines) {
  if (line.startsWith('ADZUNA_APP_ID=')) {
    APP_ID = line.split('=')[1].trim();
  }
  if (line.startsWith('ADZUNA_APP_KEY=')) {
    APP_KEY = line.split('=')[1].trim();
  }
}

console.log('API Credentials Check:');
console.log('APP_ID length:', APP_ID?.length || 0);
console.log('APP_KEY length:', APP_KEY?.length || 0);
console.log('');

async function testAdzunaEndpoint(country, query, location) {
  const baseUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;
  const params = new URLSearchParams({
    app_id: APP_ID,
    app_key: APP_KEY,
    results_per_page: '10',
    page: '1',
  });

  if (query) params.set('what', query);
  if (location) params.set('where', location);

  const url = `${baseUrl}?${params}`;
  
  console.log(`Testing: ${country.toUpperCase()} | Query: "${query || 'none'}" | Location: "${location || 'none'}"`);
  
  try {
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ SUCCESS! Found ${data.count} jobs`);
      if (data.results && data.results.length > 0) {
        console.log(`   First job: ${data.results[0].title} at ${data.results[0].company.display_name}`);
      }
      return true;
    } else {
      const errorText = await response.text();
      console.log(`❌ FAILED with status ${response.status}`);
      if (errorText.includes('nginx')) {
        console.log(`   Error type: Nginx firewall block`);
      } else {
        console.log(`   Error: ${errorText.substring(0, 150)}`);
      }
      return false;
    }
  } catch (error) {
    console.log(`❌ EXCEPTION: ${error.message}`);
    return false;
  }
  console.log('');
}

async function runTests() {
  console.log('═══════════════════════════════════════');
  console.log('ADZUNA API DIAGNOSTIC TEST');
  console.log('═══════════════════════════════════════\n');

  // Test 1: US endpoint with simple query (baseline)
  console.log('TEST 1: US endpoint with simple query');
  await testAdzunaEndpoint('us', 'software engineer', null);
  console.log('');

  // Test 2: US endpoint with location
  console.log('TEST 2: US endpoint with location');
  await testAdzunaEndpoint('us', 'developer', 'New York');
  console.log('');

  // Test 3: India endpoint with NO query (just location)
  console.log('TEST 3: India endpoint with location only');
  await testAdzunaEndpoint('in', null, 'Hyderabad');
  console.log('');

  // Test 4: India endpoint with simple query, no location
  console.log('TEST 4: India endpoint with simple query, no location');
  await testAdzunaEndpoint('in', 'python', null);
  console.log('');

  // Test 5: India endpoint with query + location
  console.log('TEST 5: India endpoint with query and location');
  await testAdzunaEndpoint('in', 'python', 'Hyderabad');
  console.log('');

  // Test 6: India endpoint with complex query (like production)
  console.log('TEST 6: India endpoint with complex query (production-like)');
  await testAdzunaEndpoint('in', 'python sql java tensorflow', 'Hyderabad');
  console.log('');

  // Test 7: India endpoint with problematic keywords
  console.log('TEST 7: India endpoint with generic keywords (testing filter)');
  await testAdzunaEndpoint('in', 'languages libraries basic', 'Hyderabad');
  console.log('');

  console.log('═══════════════════════════════════════');
  console.log('DIAGNOSTIC COMPLETE');
  console.log('═══════════════════════════════════════');
}

runTests().catch(console.error);
