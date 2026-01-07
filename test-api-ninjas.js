/**
 * Test API-Ninjas Jobs API
 * Simple test to verify the API works
 */

const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '.env.local');
let API_NINJAS_KEY;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('API_NINJAS_KEY=')) {
      API_NINJAS_KEY = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.error('Could not read .env.local');
}

console.log('═══════════════════════════════════════');
console.log('API-NINJAS JOBS API TEST');
console.log('═══════════════════════════════════════\n');

if (!API_NINJAS_KEY) {
  console.log('❌ API_NINJAS_KEY not found in .env.local\n');
  console.log('📝 To get a FREE API key (50,000 requests/month):');
  console.log('1. Visit: https://api-ninjas.com/register');
  console.log('2. Verify your email');
  console.log('3. Go to: https://api-ninjas.com/profile');
  console.log('4. Copy your API key');
  console.log('5. Add to .env.local: API_NINJAS_KEY=your_key_here\n');
  process.exit(1);
}

console.log('✅ API Key found\n');

async function testAPINinjas() {
  const query = 'python data analyst';
  const location = 'Hyderabad';
  
  console.log('🔍 Search Query:', query);
  console.log('📍 Location:', location);
  console.log('');
  
  const params = new URLSearchParams();
  params.set('query', query);
  params.set('location', location);
  
  const url = `https://api.api-ninjas.com/v1/jobs?${params}`;
  
  console.log('⏳ Calling API-Ninjas...\n');
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_NINJAS_KEY,
      },
    });
    
    console.log('📊 Response Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:');
      console.log(errorText.substring(0, 500));
      
      if (response.status === 401) {
        console.log('\n💡 Your API key is invalid. Please check it.');
      } else if (response.status === 403) {
        console.log('\n💡 Access forbidden. Your key might not have permission.');
      } else if (response.status === 429) {
        console.log('\n💡 Rate limit exceeded. Wait a bit.');
      }
      return;
    }
    
    const jobs = await response.json();
    
    if (!Array.isArray(jobs)) {
      console.log('❌ Unexpected response format');
      console.log(jobs);
      return;
    }
    
    console.log('✅ SUCCESS!\n');
    console.log('📋 Found', jobs.length, 'jobs\n');
    
    if (jobs.length > 0) {
      console.log('🎯 Sample Jobs:');
      console.log('─'.repeat(60));
      
      jobs.slice(0, 5).forEach((job, index) => {
        console.log(`\n${index + 1}. ${job.title || 'Unknown Title'}`);
        console.log(`   Company: ${job.company || 'Unknown'}`);
        console.log(`   Location: ${job.location || 'Remote'}`);
        if (job.salary) console.log(`   Salary: ${job.salary}`);
        if (job.employment_type) console.log(`   Type: ${job.employment_type}`);
        if (job.date_posted) console.log(`   Posted: ${job.date_posted}`);
      });
      
      console.log('\n' + '─'.repeat(60));
      console.log('\n✅ API-NINJAS IS WORKING PERFECTLY!');
      console.log('   Ready to deploy to Vercel!\n');
    } else {
      console.log('⚠️  No jobs found for this search.');
      console.log('   API is working, just no results for this query.\n');
    }
    
  } catch (error) {
    console.log('❌ Exception:', error.message);
    console.log('\n💡 Check your internet connection.\n');
  }
}

testAPINinjas();
