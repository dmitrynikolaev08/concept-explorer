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

const FormSchema = z.object({
  conceptName: z.string().min(1, 'Please enter a concept name'),
  includeCitations: z.boolean(),
});

export function ConceptCitationForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      includeCitations: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
      toast({
        title: 'Explanation Received',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result.reply}</code>
          </pre>
        ),
      });
    } catch (error) {
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
                  <FormLabel>Include Citations</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="reset">
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ConceptCitationForm;
