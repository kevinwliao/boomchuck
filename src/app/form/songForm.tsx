"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createSong } from "@/lib/actions";
import React from "react";
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
import { CircleCheckBig, LoaderCircle } from "lucide-react";

const formSchema = songSchema.omit({
  measures: true,
  userId: true,
  tempo: true,
});

const testUserId = "test_user_id";

export default function SongForm({
  openHandler,
}: {
  openHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    formState: { isSubmitting, isSubmitted },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newSong: Song = {
      userId: testUserId,
      name: values.name,
      measures: [
        { chord: { root: "G", quality: "M" } },
        { chord: { root: "G", quality: "M" } },
        { chord: { root: "D", quality: "7" } },
        { chord: { root: "G", quality: "M" } },
      ],
    };
    await createSong(newSong);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    openHandler(false);
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
        <Button disabled={isSubmitting} type="submit">
          Save Song
        </Button>
      </form>
    </Form>
  );
}
