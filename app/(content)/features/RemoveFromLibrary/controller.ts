import { z } from 'zod'
import { createServerAction } from 'zsa'
import {
  removeFromLibraryMovie,
  removeFromLibraryTv,
  removeFromLibraryTvSeason,
  removeFromLibraryTvAnime,
  removeFromLibraryAnimeSeason,
  removeFromLibraryAnimeMovie,
} from './actions'

const removeFromLibrarySchema = z.object({
  type: z.enum([
    'movie',
    'tv',
    'season',
    'animetv',
    'animemovie',
    'animetvseason',
  ]),
  mediaId: z.string(),
  seasonId: z.string().optional(),
})

export const removeFromLibraryAction = createServerAction()
  .input(removeFromLibrarySchema)
  .handler(async ({ input }) => {
    const { type, mediaId, seasonId } = input

    switch (type) {
      case 'movie':
        return removeFromLibraryMovie({ mediaId })
      case 'tv':
        return removeFromLibraryTv({ mediaId })
      case 'season':
        return removeFromLibraryTvSeason({ mediaId, seasonId: seasonId ?? '' })
      case 'animetv':
        return removeFromLibraryTvAnime({ mediaId })
      case 'animemovie':
        return removeFromLibraryAnimeMovie({ mediaId })
      case 'animetvseason':
        return removeFromLibraryAnimeSeason({
          mediaId,
          seasonId: seasonId ?? '',
        })
      default:
        throw new Error('Invalid type')
    }
  })
