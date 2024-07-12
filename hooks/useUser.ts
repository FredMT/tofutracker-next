import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'

export default async function useUser(): Promise<User | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
