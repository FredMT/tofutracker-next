"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";

const FormSchema = z.object({
  activity_privacy: z.boolean().default(false).optional(),
});

export default function PrivateActivityCheckbox({
  user_id,
  username,
  activityIsPrivate,
  updateActivityPrivacySetting,
}: {
  user_id: string;
  username: string;
  activityIsPrivate: boolean;
  updateActivityPrivacySetting: () => void;
}) {
  const supabase = createClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activity_privacy: activityIsPrivate,
    },
  });

  const { mutate } = useSWRConfig();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await updateActivityPrivacySetting(data, user_id, username);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="activity_privacy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Make my activity <span className="underline">private</span>
                </FormLabel>
                <FormDescription>
                  {activityIsPrivate
                    ? "Your activity is currently private. No one else can see your activity. Unchecking this box and saving will make your activity public."
                    : "Your activity is currently public. Everyone can see your activity. Checking this box and saving will make your activity private."}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
