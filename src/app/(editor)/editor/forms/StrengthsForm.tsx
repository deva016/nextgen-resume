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
      strengths: resumeData.strengths || [],
      strengthsDescription: resumeData.strengthsDescription || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        strengths:
          values.strengths
            ?.filter((strength) => strength !== undefined)
            .map((strength) => strength.trim())
            .filter((strength) => strength !== "") || [],
        strengthsDescription: values.strengthsDescription,
      });
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
            name="strengthsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strengths Overview (Optional)</FormLabel>
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
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Strengths</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Leadership, Problem Solving, Team Collaboration, ..."
                    onChange={(e) => {
                      const strengths = e.target.value.split(",");
                      field.onChange(strengths);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each strength with a comma.
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
