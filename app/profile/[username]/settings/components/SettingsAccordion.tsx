import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import PrivateActivityCheckbox from './PrivateActivityCheckbox'
import { createClient } from '@/utils/supabase/server'
import {
  getActivityPrivacySetting,
  updateActivityPrivacySetting,
} from './actions'
import UsernameChange from './UsernameChange'
import { redirect } from 'next/navigation'
import PasswordChange from './PasswordChange'
import UpdateAvatar from './UpdateAvatar'
import UpdateBanner from './UpdateBanner'

export default async function SettingsAccordion() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userData, error: userError } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user?.id)
    .single()

  if (userError) {
    redirect('/')
  }

  let activityIsPrivate = false
  if (user) {
    activityIsPrivate = await getActivityPrivacySetting(
      user.id,
      userData.username
    )

    return (
      <Accordion type="multiple" className="mb-6 w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Account</AccordionTrigger>
          <AccordionContent className="ml-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-md border-2 p-4">
              <div className="flex flex-col">
                <UsernameChange user_id={user.id} />
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-md border-2 p-4">
              <PasswordChange />
            </div>
            <div className="flex flex-col gap-4 rounded-md border-2 p-4">
              <UpdateAvatar />
            </div>
            <div className="flex flex-col gap-4 rounded-md border-2 p-4">
              <UpdateBanner />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
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
    )
  }
}
