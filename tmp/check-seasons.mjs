import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSeasons() {
  const { data, error } = await supabase
    .from('seasons')
    .select('id, name, is_active');

  if (error) {
    console.error('Error fetching seasons:', error);
    return;
  }

  console.log('Seasons data:');
  console.log(JSON.stringify(data, null, 2));
}

checkSeasons();
