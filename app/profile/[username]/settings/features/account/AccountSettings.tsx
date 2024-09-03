'use client'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import UsernameForm from './components/UsernameForm'
// import PasswordForm from './components/PasswordForm'

interface AccountSettingsProps {
  userId: number
}

export default function AccountSettings({ userId }: AccountSettingsProps) {
  return (
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* <UsernameForm userId={userId} /> */}
          {/* <PasswordForm userId={userId} /> */}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
