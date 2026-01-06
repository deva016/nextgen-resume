"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      languages: resumeData.languages || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
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
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Languages</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Describe the languages you speak and your proficiency levels..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
