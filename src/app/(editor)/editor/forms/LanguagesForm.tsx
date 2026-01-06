"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { EditorFormProps } from "@/lib/types";
import { languagesSchema, LanguagesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LanguagesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<LanguagesValues>({
    resolver: zodResolver(languagesSchema),
    defaultValues: {
      languages: resumeData.languages || [],
      languagesDescription: resumeData.languagesDescription || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        languages:
          values.languages
            ?.filter((language) => language !== undefined)
            .map((language) => language.trim())
            .filter((language) => language !== "") || [],
        languagesDescription: values.languagesDescription,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Languages</h2>
        <p className="text-sm text-muted-foreground">What languages do you speak?</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="languagesDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages Overview (Optional)</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Describe your language proficiency and communication skills..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Languages</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. English, Hindi, Spanish, ..."
                    onChange={(e) => {
                      const languages = e.target.value.split(",");
                      field.onChange(languages);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each language with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
