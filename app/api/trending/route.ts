import axios from "axios";

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  logo_path: string;
  genre_ids: number[];
};

export async function GET() {
  try {
    const trendingResponse = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`
    );

    const moviesWithLogos = await Promise.all(
      trendingResponse.data.results.map(async (movie: any) => {
        const simplifiedMovie: Movie = {
          id: movie.id,
          backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          title: movie.title,
          logo_path: "",
          genre_ids: movie.genre_ids,
        };
        try {
          const imagesResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${process.env.TMDB_API_KEY}&include_image_language=en,null`
          );
          const logos = imagesResponse.data.logos;
          if (logos && logos.length > 0) {
            simplifiedMovie.logo_path = `https://image.tmdb.org/t/p/original${logos[0].file_path}`;
          }
          return simplifiedMovie;
        } catch (imageError) {
          console.log(
            `Error fetching images for movie ID ${movie.id}: ${imageError}`
          );
          return simplifiedMovie;
        }
      })
    );

    trendingResponse.data.results = moviesWithLogos;
    return new Response(JSON.stringify(trendingResponse.data.results), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return new Response(
      "An error occurred while trying to fetch trending movies",
      {
        status: 500,
      }
    );
  }
}
