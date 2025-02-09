'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { scanDependencies, validatePackageJson } from './utils';
import { Spinner } from '../ui/spinner';
import { useState } from 'react';

export const SearchForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('package-json');
    if (!file) {
      toast({
        title: 'Error',
        description: 'No file selected, please select a package.json file',
      });
      setLoading(false);
      return;
    }

    const readFileAsText = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
      });
    };

    try {
      const data = await readFileAsText(file as File);
      const parsedFile = JSON.parse(data);
      validatePackageJson(parsedFile);
      const queryParams = await scanDependencies(parsedFile);
      router.push(`/results?${queryParams}`);
    } catch (error) {
      if (error instanceof Error || error instanceof SyntaxError) {
        toast({
          title: 'Error',
          description: "The file doesn't contain valid JSON",
        });
      } else {
        toast({
          title: 'Error',
          description: "Unknown error, couldn't read the file",
        });
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid w-full max-w-sm items-center gap-3'
    >
      <Input id='package' name='package-json' type='file' />
      <Button type='submit'>
        Scan file
        {loading && <Spinner />}
      </Button>
    </form>
  );
};
