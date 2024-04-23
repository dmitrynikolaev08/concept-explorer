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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowUpRight, Copy, Loader2 } from 'lucide-react';
import { marked } from 'marked';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({
  conceptName: z.string().min(1, 'Please enter a concept name'),
  includeCitations: z.boolean(),
  targetLanguage: z.string().min(1, 'Please select a target language'),
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

  async function getTranslation(
    conceptExplanation: string,
    targetLanguage: string
  ) {
    setIsLoading(true);
    setExplanation('');
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conceptExplanation, targetLanguage }),
      });
      if (!response.ok) {
        toast({
          title: 'Error Fetching Translation',
          description: 'Failed to fetch translation from OpenAI.',
          variant: 'destructive',
        });
        return;
      }
      const result = await response.json();
      if (result.error) {
        console.error('Error fetching translation:', result.error);
        toast({
          title: 'Error Fetching Translation',
          description: 'Failed to fetch translation from OpenAI.',
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
      console.error('Error fetching translation:', error);
      toast({
        title: 'Error Fetching Translation',
        description: 'Failed to fetch translation from OpenAI.',
        variant: 'destructive',
      });
    }
  }

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
      getTranslation(result.reply, data.targetLanguage);
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
        <CardTitle>Concept Explanation</CardTitle>
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
            <FormField
              control={form.control}
              name="conceptName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concept Name</FormLabel>
                  <Input placeholder="e.g., Polymorphism" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="english">English (default)</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="czech">Czech</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the language in which you want to get the explanation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Submit
                    </>
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
          <Button variant="outline" type="reset" onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default ConceptCitationForm;
