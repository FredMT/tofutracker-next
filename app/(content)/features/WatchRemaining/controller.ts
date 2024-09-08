import {
  watchRemaningAnimeTvAction,
  watchRemaningAnimeTvSeasonAction,
  watchRemaningTvAction,
  watchRemaningTvSeasonAction,
} from '@/app/(content)/features/WatchRemaining/actions'
import { z } from 'zod'
import { createServerAction } from 'zsa'

const watchRemaniningSchema = z.object({
  type: z.string(),
  mediaId: z.number(),
  seasonId: z.string().optional(),
  datetime: z.string(),
})

export const watchRemainingController = createServerAction()
  .input(watchRemaniningSchema)
  .handler(async ({ input }) => {
    const { type, mediaId, seasonId, datetime } = input

    switch (type) {
      case 'tv':
        return watchRemaningTvAction({ mediaId, datetime })
      case 'season':
        return watchRemaningTvSeasonAction({
          mediaId,
          seasonId: seasonId ?? '',
          datetime,
        })
      case 'animetv':
        return watchRemaningAnimeTvAction({ mediaId })
      case 'animetvseason':
        return watchRemaningAnimeTvSeasonAction({
          mediaId,
          seasonId: seasonId ?? '',
        })
      default:
        throw new Error('Invalid type')
    }
  })
