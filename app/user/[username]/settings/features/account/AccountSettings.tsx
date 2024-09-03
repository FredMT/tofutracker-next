import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UsernameForm from './components/UsernameForm'
import { Profile } from '@prisma/client'
// import PasswordForm from './components/PasswordForm'

export default function AccountSettings({ profile }: { profile: Profile }) {
  return (
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UsernameForm profile={profile} />
          {/* <PasswordForm userId={userId} /> */}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
