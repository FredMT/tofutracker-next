import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { Profile } from '@prisma/client'
import UsernameForm from './components/UsernameForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AccountSettings({
  profile,
  accountType,
}: {
  profile: Profile
  accountType: string
}) {
  return (
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UsernameForm profile={profile} />
          {accountType === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle>Change password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button asChild>
                  <Link href="/sign-in/forgot-password">Change password</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
