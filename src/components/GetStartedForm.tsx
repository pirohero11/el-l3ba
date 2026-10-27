'use client';
 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import { createChild } from '@/app/[locale]/Children/action';
import { setSession } from '@/lib/session';

interface GetStartedFormProps {
  locale: string;
  labels: {
    name: string;
    username: string;
    getStarted: string;
  };
}

export default function GetStartedForm({ locale, labels }: GetStartedFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await createChild(formData);

      if (!result.success || !result.data) {
        setErrorMsg(result.error || 'Could not create Child');
        setLoading(false);
        return;
      }

      // Store the database record as it is in localStorage for the 'session' key
      setSession(result.data);
      // Also directly ensure the explicit key 'session' is set in localStorage
      localStorage.setItem('session', JSON.stringify(result.data));

      // Navigate to the scan page right after sign in
      router.push(`/${locale}/child/scan`);
    } catch (err: any) {
      console.error('Failed to create child and store session:', err);
      setErrorMsg(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10">
      {/*avatars selection loop*/}
      <div className="w-full max-w-md">
        <AvatarSelector name="ImageName" />
      </div>

      {/*text name*/}
      <div className="flex flex-col w-full items-center p-5 pt-0 -mt-4">
        <label htmlFor="name" className="text-2xl font-bold text-bright-purple">
          {labels.name}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder={labels.username}
          className="w-9/10 max-w-md p-4 rounded-full border-4 border-bright-purple shadow-card mt-4 text-lg font-bold"
        />
        {errorMsg && (
          <p className="text-red-500 font-bold mt-2 text-sm text-center">{errorMsg}</p>
        )}
      </div>

      {/*start button*/}
      <Button
        type="submit"
        disabled={loading}
        className="bg-sunny-yellow w-80 h-17 text-4xl text-bright-purple font-extrabold rounded-60 shadow-button disabled:opacity-50"
      >
        {loading ? '...' : labels.getStarted}
      </Button>
    </form>
  );
}
