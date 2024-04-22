import SampleCard from '@/components/ui/sample-card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-20">
      <div className="z-10 w-full items-center justify-center text-sm lg:flex">
        <div className="flex items-center justify-center">
          <SampleCard />
        </div>
      </div>
    </main>
  );
}
