const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.log('Supabase connection error:', error.message);
      // It might be that the table 'users' doesn't exist, but at least we'll see if it connects
      if (error.code === '42P01') {
         console.log('Connection successful! The "users" table does not exist, but Supabase is reachable.');
      }
    } else {
      console.log('Supabase connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();
