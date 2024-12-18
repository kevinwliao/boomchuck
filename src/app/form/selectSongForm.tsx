"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn, makeSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Song } from "@/lib/schemas";

const FormSchema = z.object({
  song: z.string({
    required_error: "Please select a song.",
  }),
});

export function SelectSongForm({
  songs,
  openHandler,
}: {
  songs: Song[];
  openHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push("/app/" + makeSlug(data.song));
  }

  return (
    <Form {...form}>
      {/* <div>{JSON.stringify(songs)}</div> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="song"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Song</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? songs.find((song) => song.slug === field.value)?.name
                        : "Select song"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search song..." />
                    <CommandList>
                      <CommandEmpty>No songs found.</CommandEmpty>
                      <CommandGroup>
                        {songs.map((song) => (
                          <CommandItem
                            value={song.name}
                            key={song.slug}
                            onSelect={() => {
                              form.setValue("song", song.slug);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                song.slug === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {song.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the song that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => openHandler(false)}
          >
            Close
          </Button>
          <Button type="submit">Open Song</Button>
        </div>
      </form>
    </Form>
  );
}
