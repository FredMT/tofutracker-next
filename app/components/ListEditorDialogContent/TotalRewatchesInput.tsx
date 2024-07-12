import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function TotalRewatchesInput({
  totalRewatches,
  setTotalRewatches,
}: {
  totalRewatches: number
  setTotalRewatches: (value: number) => void
}) {
  const handleTotalRewatchesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(event.target.value, 10)
    setTotalRewatches(isNaN(newValue) ? 0 : Math.max(0, newValue))
  }

  return (
    <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
      <Label htmlFor="total-rewatches">Total Rewatches</Label>
      <Input
        type="number"
        id="total-rewatches"
        className="max-sm:w-[50vw]"
        placeholder="0"
        value={totalRewatches}
        onChange={handleTotalRewatchesChange}
        min="0"
      />
    </div>
  )
}
