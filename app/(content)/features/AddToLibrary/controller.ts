import { z } from 'zod'
import { createServerAction } from 'zsa'
import {
  addToLibraryMovie,
  addToLibraryMovieAnime,
  addToLibraryTvAnime,
  addToLibraryTvAnimeSeason,
  addToLibraryTv,
  addToLibraryTvSeason,
} from './actions'

const addToLibrarySchema = z.object({
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

export const addToLibraryAction = createServerAction()
  .input(addToLibrarySchema)
  .handler(async ({ input }) => {
    const { type, mediaId, seasonId } = input

    switch (type) {
      case 'movie':
        return addToLibraryMovie({ mediaId })
      case 'tv':
        return addToLibraryTv({ mediaId })
      case 'season':
        return addToLibraryTvSeason({ mediaId, seasonId: seasonId ?? '' })
      case 'animetv':
        return addToLibraryTvAnime({ mediaId })
      case 'animemovie':
        return addToLibraryMovieAnime({ mediaId })
      case 'animetvseason':
        return addToLibraryTvAnimeSeason({ mediaId, seasonId: seasonId ?? '' })
      default:
        throw new Error('Invalid type')
    }
  })
