import { z } from 'zod'
import { createServerAction } from 'zsa'
import {
  changeWatchStatusMovie,
  changeWatchStatusTv,
  changeWatchStatusTvSeason,
  changeWatchStatusAnimeTv,
  changeWatchStatusAnimeTvSeason,
  changeWatchStatusAnimeMovie,
} from './actions'

const watchStatusSchema = z.object({
  type: z.enum([
    'movie',
    'tv',
    'season',
    'animetv',
    'animemovie',
    'animetvseason',
  ]),
  mediaId: z.string(),
  watchStatus: z.string(),
  seasonId: z.string().optional(),
})

export const changeWatchStatusAction = createServerAction()
  .input(watchStatusSchema)
  .handler(async ({ input }) => {
    const { type, mediaId, watchStatus, seasonId } = input

    switch (type) {
      case 'movie':
        return changeWatchStatusMovie({ mediaId, watchStatus })
      case 'tv':
        return changeWatchStatusTv({ mediaId, watchStatus })
      case 'season':
        return changeWatchStatusTvSeason({
          mediaId,
          watchStatus,
          seasonId: seasonId ?? '',
        })
      case 'animetv':
        return changeWatchStatusAnimeTv({ mediaId, watchStatus })
      case 'animemovie':
        return changeWatchStatusAnimeMovie({ mediaId, watchStatus })
      case 'animetvseason':
        return changeWatchStatusAnimeTvSeason({
          mediaId,
          watchStatus,
          seasonId: seasonId ?? '',
        })
      default:
        throw new Error('Invalid type')
    }
  })
