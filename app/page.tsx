import { SearchForm } from '@/components/forms/search-form';

export default function Home() {
  return (
    <div className='flex items-center justify-center bg-slate-200 w-full h-full font-[family-name:var(--font-geist-mono)]'>
      <main className='flex flex-col gap- m-6'>
        <h1 className='text-center font-semibold text-2xl'>
          Package.json file scanner
        </h1>
        <SearchForm />
      </main>
    </div>
  );
}
