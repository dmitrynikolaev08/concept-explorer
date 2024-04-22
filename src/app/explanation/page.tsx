import { ConceptCitationForm } from '@/components/ui/concept-citation-form';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ExplanationPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await clerkClient.users.getUser(userId);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-12 md:py-24 md:px-20">
      {user && (
        <>
          <div className="z-10 w-full items-center justify-center text-sm lg:flex">
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-3xl font-semibold text-black mb-4 md:mb-8">
                👋 Hi, {user.firstName || `Stranger`}
              </h1>
              <ConceptCitationForm />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
