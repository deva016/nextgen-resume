/**
 * Test script for JSearch API integration
 * Run this to verify the API works before deploying
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
  console.error('Could not read .env.local:', error.message);
}

console.log('═══════════════════════════════════════');
console.log('JSEARCH API TEST');
console.log('═══════════════════════════════════════\n');

if (!RAPID_API_KEY) {
  console.log('❌ RAPID_API_KEY not found in .env.local');
  console.log('\n📝 To get a free RapidAPI key:');
  console.log('1. Visit: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch');
  console.log('2. Click "Subscribe to Test"');
  console.log('3. Select the FREE plan (2,500 requests/month)');
  console.log('4. Copy your API key');
  console.log('5. Add to .env.local: RAPID_API_KEY=your_key_here');
  console.log('\n');
  process.exit(1);
}

console.log('✅ API Key found (length:', RAPID_API_KEY.length, ')');
console.log('');

async function testJSearchAPI() {
  // Test with your actual resume keywords
  const keywords = ['python', 'sql', 'java', 'tensorflow', 'data analyst'];
  const location = 'Hyderabad, India';
  
  const query = `${keywords.join(' ')} in ${location}`;
  
  console.log('🔍 Search Query:', query);
  console.log('📍 Location:', location);
  console.log('');
  
  const url = new URL('https://jsearch.p.rapidapi.com/search');
  url.searchParams.set('query', query);
  url.searchParams.set('page', '1');
  url.searchParams.set('num_pages', '1');
  url.searchParams.set('date_posted', 'month'); // Last 30 days
  
  console.log('⏳ Calling JSearch API...\n');
  
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
    
    console.log('📊 Response Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:');
      console.log(errorText.substring(0, 500));
      
      if (response.status === 403) {
        console.log('\n💡 Tip: Your API key might be invalid or you need to subscribe to the API');
      } else if (response.status === 429) {
        console.log('\n💡 Tip: You\'ve hit the rate limit. Wait a bit or upgrade your plan');
      }
      return;
    }
    
    const data = await response.json();
    
    if (data.status === 'error' || !data.data) {
      console.log('❌ API returned an error:');
      console.log(data);
      return;
    }
    
    const jobs = data.data || [];
    
    console.log('✅ SUCCESS!');
    console.log('');
    console.log('📋 Results:');
    console.log(`   Total jobs found: ${jobs.length}`);
    console.log('');
    
    if (jobs.length > 0) {
      console.log('🎯 Sample Jobs:');
      console.log('─'.repeat(60));
      
      jobs.slice(0, 5).forEach((job, index) => {
        console.log(`\n${index + 1}. ${job.job_title}`);
        console.log(`   Company: ${job.employer_name || job.job_publisher || 'Unknown'}`);
        console.log(`   Location: ${job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country}`);
        
        if (job.job_min_salary && job.job_max_salary) {
          const currency = job.job_salary_currency || '$';
          console.log(`   Salary: ${currency}${job.job_min_salary.toLocaleString()} - ${currency}${job.job_max_salary.toLocaleString()}`);
        }
        
        if (job.job_employment_type) {
          console.log(`   Type: ${job.job_employment_type}`);
        }
        
        if (job.job_posted_at_datetime_utc) {
          const postedDate = new Date(job.job_posted_at_datetime_utc);
          const daysAgo = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
          console.log(`   Posted: ${daysAgo} days ago`);
        }
      });
      
      console.log('\n' + '─'.repeat(60));
      console.log('\n✅ JSearch API is working perfectly!');
      console.log('   You can now deploy to Vercel with confidence.\n');
    } else {
      console.log('⚠️  No jobs found for this search.');
      console.log('   Try adjusting keywords or location.\n');
    }
    
  } catch (error) {
    console.log('❌ Exception occurred:');
    console.log(error.message);
    console.log('\n💡 Check your internet connection and API key.\n');
  }
}

testJSearchAPI();
