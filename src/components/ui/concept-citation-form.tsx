'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { marked } from 'marked';

const FormSchema = z.object({
  conceptName: z.string().min(1, 'Please enter a concept name'),
  includeCitations: z.boolean(),
});

export function ConceptCitationForm() {
  const { toast } = useToast();

  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plainTextExplanation, setPlainTextExplanation] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      includeCitations: false,
    },
  });

  const copyToClipboard = async () => {
    if (!plainTextExplanation) return;

    try {
      await navigator.clipboard.writeText(plainTextExplanation);
      toast({
        title: 'Copied',
        description: 'The explanation has been copied to your clipboard.',
      });
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast({
        title: 'Failed to Copy',
        description: 'Could not copy the text. Please try again.',
        variant: 'destructive',
      });
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setExplanation('');
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast({
          title: 'Error Fetching Explanation',
          description: 'Failed to fetch explanation from OpenAI.',
          variant: 'destructive',
        });
        return;
      }
      const result = await response.json();
      if (result.error) {
        console.error('Error fetching explanation:', result.error);
        toast({
          title: 'Error Fetching Explanation',
          description: 'Failed to fetch explanation from OpenAI.',
          variant: 'destructive',
        });
        return;
      }
      setPlainTextExplanation(result.reply);
      const reply = await marked(result.reply);
      setExplanation(reply);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching explanation:', error);
      toast({
        title: 'Error Fetching Explanation',
        description: 'Failed to fetch explanation from OpenAI.',
        variant: 'destructive',
      });
    }
  }

  function onError(error: any) {
    console.error(error);
    toast({
      title: 'Form Submission Error',
      description: 'There was an error submitting the form.',
      variant: 'destructive',
    });
  }

  function handleReset() {
    form.reset();
    setExplanation('');
  }

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Concept Explanation Form</CardTitle>
        <CardDescription>
          Enter a concept name and specify if you want citations from academic
          papers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="grid gap-6"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="conceptName">Concept Name</Label>
              <Input
                id="conceptName"
                placeholder="e.g., Polymorphism"
                {...form.register('conceptName')}
              />
            </div>
            <FormField
              control={form.control}
              name="includeCitations"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Include citations</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {!explanation && (
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait...{' '}
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
        {explanation && (
          <div className="mt-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: explanation }}
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={copyToClipboard} className="ml-auto">
                    <Copy className="mr-2 h-3 w-3" />
                    Copy text
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      {explanation && (
        <CardFooter className="flex justify-center">
          <Button variant="outline" type="reset" onReset={handleReset}>
            Reset
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default ConceptCitationForm;
