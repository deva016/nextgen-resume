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
import { strengthsSchema, StrengthsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function StrengthsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<StrengthsValues>({
    resolver: zodResolver(strengthsSchema),
    defaultValues: {
      strengths: resumeData.strengths || "",
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
        <h2 className="text-2xl font-semibold">Strengths</h2>
        <p className="text-sm text-muted-foreground">What are your key strengths?</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Strengths</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Describe your key personal and professional strengths..."
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
