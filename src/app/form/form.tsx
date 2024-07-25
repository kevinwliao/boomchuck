"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createSong } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { songSchema } from "@/lib/schemas";
import { Song } from "@/lib/schemas";

const formSchema = songSchema.omit({ measures: true, userId: true });

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newSong: Song = {
      userId: "no_id",
      name: values.name,
      measures: [
        { chord: { root: "G", quality: "M" } },
        { chord: { root: "G", quality: "M" } },
        { chord: { root: "D", quality: "7" } },
        { chord: { root: "G", quality: "M" } },
      ],
    };
    createSong(newSong);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Name</FormLabel>
              <FormControl>
                <Input placeholder="Big Spike Hammer" {...field} />
              </FormControl>
              <FormDescription>This is the name of your song</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Song</Button>
      </form>
    </Form>
  );
}
