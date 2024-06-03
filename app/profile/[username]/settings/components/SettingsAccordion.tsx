import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrivateActivityCheckbox from "./PrivateActivityCheckbox";
import { createClient } from "@/utils/supabase/server";
import {
  getActivityPrivacySetting,
  updateActivityPrivacySetting,
} from "./actions";

export default async function SettingsAccordion() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user?.id)
    .single();

  let activityIsPrivate = false;
  if (user) {
    activityIsPrivate = await getActivityPrivacySetting(
      user.id,
      userData.username
    );

    return (
      <Accordion type="multiple" className="w-full mb-6">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Account</AccordionTrigger>
          <AccordionContent className="ml-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 border-2 p-4 rounded-md">
              <div className="flex flex-col">
                <Label htmlFor="username" className="text-xl">
                  Change username
                </Label>
                <p className="text-sm text-muted-foreground">
                  Used to identify you on the website
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  id="username"
                  type="text"
                  placeholder={userData.username}
                />
                <Button variant="secondary" className="w-20">
                  Save
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-2 p-4 rounded-md">
              <div className="flex flex-col">
                <Label htmlFor="username" className="text-xl">
                  Change password
                </Label>
                <p className="text-sm text-muted-foreground">
                  Used to sign you into your account
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Input id="password" type="text" />
                <Button variant="secondary" className="w-20">
                  Save
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Profile</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">Site Settings</AccordionTrigger>
          <AccordionContent>
            <PrivateActivityCheckbox
              user_id={user.id}
              username={userData.username}
              activityIsPrivate={activityIsPrivate}
              updateActivityPrivacySetting={updateActivityPrivacySetting}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
}
