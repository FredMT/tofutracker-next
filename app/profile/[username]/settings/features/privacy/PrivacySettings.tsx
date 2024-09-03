'use client'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import ActivityPrivacyToggle from './components/ActivityPrivacyToggle'

interface PrivacySettingsProps {
  userId: number
}

export default function PrivacySettings({ userId }: PrivacySettingsProps) {
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
