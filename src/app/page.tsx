import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/explanation');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-12 md:py-24 md:px-20">
      <div className="z-10 w-full items-center justify-center text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full">
          <h1>Home page</h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
