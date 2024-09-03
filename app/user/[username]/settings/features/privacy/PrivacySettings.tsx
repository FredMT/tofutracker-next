'use client'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Profile } from '@prisma/client'
// import ActivityPrivacyToggle from './components/ActivityPrivacyToggle'

export default function PrivacySettings({ profile }: { profile: Profile }) {
  return (
    <TabsContent value="privacy">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ActivityPrivacyToggle userId={userId} /> */}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
