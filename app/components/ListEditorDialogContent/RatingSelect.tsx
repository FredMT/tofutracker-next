import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const ratingDescriptions = [
  'Absolute Disaster',
  'Painful Experience',
  'Meh Fest',
  'Bearable Boredom',
  'Average',
  'Pleasantly Surprising',
  'Quite Enjoyable',
  'Great',
  'Nearly Perfect',
  'Mind Blowing',
]

export default function RatingSelect({
  rate,
  setRate,
}: {
  rate: number | null
  setRate: (value: number | null) => void
}) {
  const handleRateChange = (value: string) => {
    if (value === 'no-rating') {
      setRate(null)
    } else {
      const newRate = parseInt(value, 10)
      if (newRate >= 1 && newRate <= 10) {
        setRate(newRate)
      }
    }
  }

  return (
    <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
      <Label htmlFor="rate">Rate</Label>
      <Select
        value={rate?.toString() ?? 'no-rating'}
        onValueChange={handleRateChange}
      >
        <SelectTrigger id="rate" className="max-sm:w-[50vw]">
          <SelectValue placeholder="Select a rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="no-rating" className="cursor-pointer">
            No rating
          </SelectItem>
          {ratingDescriptions.map((desc, index) => (
            <SelectItem
              key={index + 1}
              value={(index + 1).toString()}
              className="cursor-pointer"
            >
              {index + 1} - {desc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
