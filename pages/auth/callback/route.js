import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

export default function CallbackRoute() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    async function handleCodeExchange() {
      if (code) {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANONYMOUS_KEY);
        await supabase.auth.signIn({
          provider: 'google',
          code,
        });

        router.push('/dashboard');
      }
    }

    handleCodeExchange();
  }, [code, router]);

  return null; 
}