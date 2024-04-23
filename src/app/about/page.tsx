import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-12 md:py-24 md:px-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-4xl font-bold mb-12">
          About Concept Explorer
        </h1>
        <Card className="bg-gray-50 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>My Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Concept Explorer was created to simplify the process of learning
              complex concepts across various disciplines. My goal is to make
              information accessible and understandable to everyone, regardless
              of their educational background or expertise.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Why Use Concept Explorer?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              The main purpose of Concept Explorer is to provide clear, concise,
              and reliable explanations of complex terms and concepts at the
              touch of a button. This tool is particularly useful for students,
              educators, researchers, and lifelong learners who seek to expand
              their knowledge and understanding in an efficient manner.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 shadow-xl">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              If you have any questions or feedback, feel free to reach out to
              me:
              <div className="flex flex-wrap gap-3 mt-5">
                <Button asChild>
                  <a href={siteConfig.links.schoolEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    School email
                  </a>
                </Button>
                <Button asChild>
                  <a href={siteConfig.links.personalEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Personal email
                  </a>
                </Button>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
