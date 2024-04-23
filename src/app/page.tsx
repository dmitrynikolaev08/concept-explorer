import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/explanation');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-12 md:py-24 md:px-20">
      <div className="z-10 w-full items-center justify-center text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            Sophisticated Learning, Simplified
          </h1>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight max-w-2xl text-center mt-4">
            Concept Explorer leverages advanced AI technology to break down
            sophisticated concepts into simple, digestible explanations. Whether
            it&apos;s for academic purposes, professional development, or
            personal curiosity, our app makes comprehensive understanding
            accessible to everyone.
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-stretch justify-center mt-10 md:mt-16 max-w-4xl w-full gap-4">
            <Card className="max-w-[250px]">
              <CardHeader>
                <CardTitle>
                  Customized Content in Your Preferred Language
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p>
                  Don&apos;t let language be a barrier to knowledge. Choose
                  explanations in several major languages and understand complex
                  topics in the language you are most comfortable with.
                </p>
              </CardContent>
            </Card>
            <Card className="max-w-[250px]">
              <CardHeader>
                <CardTitle>Accurate Citations for Academic Purposes</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p>
                  Need detailed citations for academic or professional use? Just
                  toggle on the citation feature and receive well-referenced
                  content that backs up the explained concepts.
                </p>
              </CardContent>
            </Card>
            <Card className="max-w-[250px]">
              <CardHeader>
                <CardTitle>Empowering Education Through Technology</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p>
                  Committed to enhancing educational experiences through
                  cutting-edge technology. Learn, understand, and apply
                  knowledge effortlessly.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="w-full my-12 text-center max-w-lg">
            <h2 className="text-2xl font-bold">What is Concept Explorer?</h2>
            <p className="text-md font-medium mt-3">
              What is Concept Explorer? Concept Explorer is an educational tool
              that utilizes advanced AI technology to provide clear and concise
              explanations of various subjects. This platform is designed to
              support users in understanding complex concepts by delivering
              straightforward and well-referenced explanations for any topic of
              interest.
            </p>
            <Button asChild className="mt-5">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
