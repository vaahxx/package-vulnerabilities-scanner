'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { VulnerabilitiesList } from './components/vulnerability-list';

function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dataParam = searchParams.get('data');
  const parsedData = dataParam
    ? JSON.parse(decodeURIComponent(dataParam))
    : null;

  return (
    <div className='flex items-center justify-center bg-slate-200 w-full h-full font-[family-name:var(--font-geist-mono)]'>
      <main className='flex flex-col gap-7 m-6'>
        <h1 className='text-center font-semibold text-2xl'>Vulnerabilities</h1>
        {parsedData ? (
          <VulnerabilitiesList packages={parsedData} />
        ) : (
          <h2>No vulnerabilities were found :)</h2>
        )}

        <Button onClick={() => router.push('/')}>Scan another file</Button>
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
}
