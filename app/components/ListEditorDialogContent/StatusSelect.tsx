import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function StatusSelect({
  status,
  setStatus,
}: {
  status: string
  setStatus: (value: string) => void
}) {
  return (
    <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
      <Label htmlFor="status">Status</Label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger id="status" className="max-sm:w-[50vw]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COMPLETED" className="cursor-pointer">
            Completed
          </SelectItem>
          <SelectItem value="WATCHING" className="cursor-pointer">
            Watching
          </SelectItem>
          <SelectItem value="DROPPED" className="cursor-pointer">
            Dropped
          </SelectItem>
          <SelectItem value="PLANTOWATCH" className="cursor-pointer">
            Plan to Watch
          </SelectItem>
          <SelectItem value="REWATCHING" className="cursor-pointer">
            Rewatching
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
