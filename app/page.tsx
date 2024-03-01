import HomepageTrendingMovieCarousel from "./components/HomepageTrendingMovieCarousel";
import { ModeToggle } from "../components/ui/theme";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <HomepageTrendingMovieCarousel />
    </main>
  );
}
