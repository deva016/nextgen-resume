// Test with the exact credentials from the screenshot
const APP_ID = 'ed10698d';
const APP_KEY = '87fa024903574c920ef10c6d8f1ad7d0';

async function testWithRealCredentials() {
  console.log('Testing Adzuna API with your exact credentials...\n');
  
  // Test 1: Simple US endpoint
  const url1 = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=5&what=developer`;
  
  console.log('TEST 1: US endpoint with simple query');
  console.log('URL:', url1.replace(APP_KEY, 'KEY_HIDDEN'));
  
  try {
    const response = await fetch(url1);
    const text = await response.text();
    
    console.log('Status:', response.status);
    console.log('Headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2));
    
    if (response.ok) {
      const data = JSON.parse(text);
      console.log('✅ SUCCESS!');
      console.log('Jobs found:', data.count);
      console.log('Results returned:', data.results?.length || 0);
    } else {
      console.log('❌ FAILED');
      console.log('Response body (first 500 chars):');
      console.log(text.substring(0, 500));
      
      // Check if it's JSON error
      try {
        const errorJson = JSON.parse(text);
        console.log('\nParsed error:', errorJson);
      } catch (e) {
        console.log('\n(Not JSON - likely HTML error page)');
      }
    }
  } catch (error) {
    console.log('❌ EXCEPTION:', error.message);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Test 2: India endpoint
  const url2 = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=5&what=python`;
  
  console.log('TEST 2: India endpoint with simple query');
  console.log('URL:', url2.replace(APP_KEY, 'KEY_HIDDEN'));
  
  try {
    const response = await fetch(url2);
    const text = await response.text();
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = JSON.parse(text);
      console.log('✅ SUCCESS!');
      console.log('Jobs found:', data.count);
    } else {
      console.log('❌ FAILED');
      console.log('Response body (first 500 chars):');
      console.log(text.substring(0, 500));
    }
  } catch (error) {
    console.log('❌ EXCEPTION:', error.message);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Test 3: Check account status endpoint
  console.log('TEST 3: Checking account/quota status...');
  const statusUrl = `https://api.adzuna.com/v1/api/jobs/gb/history?app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  try {
    const response = await fetch(statusUrl);
    const text = await response.text();
    
    console.log('Status:', response.status);
    if (response.ok) {
      console.log('Account data:', text.substring(0, 200));
    } else {
      console.log('Cannot fetch account info:', text.substring(0, 200));
    }
  } catch (error) {
    console.log('Cannot check account:', error.message);
  }
}

testWithRealCredentials();
