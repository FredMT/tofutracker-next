import { z } from 'zod'
import { createServerAction } from 'zsa'
import {
  rateMovie,
  rateTv,
  rateTvSeason,
  rateTvAnime,
  rateTvAnimeSeason,
  rateAnimeMovie,
} from './actions'

const rateMediaSchema = z.object({
  type: z.enum([
    'movie',
    'tv',
    'season',
    'animetv',
    'animemovie',
    'animetvseason',
  ]),
  mediaId: z.string(),
  rating: z.number(),
  seasonId: z.string().optional(),
})

export const rateMediaAction = createServerAction()
  .input(rateMediaSchema)
  .handler(async ({ input }) => {
    const { type, mediaId, rating, seasonId } = input

    switch (type) {
      case 'movie':
        return rateMovie({ mediaId, rating })
      case 'tv':
        return rateTv({ mediaId, rating })
      case 'season':
        return rateTvSeason({ mediaId, seasonId: seasonId ?? '', rating })
      case 'animetv':
        return rateTvAnime({ mediaId, rating })
      case 'animemovie':
        return rateAnimeMovie({ mediaId, rating })
      case 'animetvseason':
        return rateTvAnimeSeason({ mediaId, seasonId: seasonId ?? '', rating })
      default:
        throw new Error('Invalid type')
    }
  })
