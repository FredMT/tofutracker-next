import { Button } from "@/components/ui/button";

type User = {
  id: string;
};

export default function AnimeLibraryButton({
  id,
  user,
  addAnimeToLibrary,
  removeAnimeFromLibrary,
  isInLibrary,
}: {
  id: number;
  user: User | null;
  addAnimeToLibrary: (formData: FormData) => Promise<void>;
  removeAnimeFromLibrary: (formData: FormData) => Promise<void>;
  isInLibrary: boolean;
}) {
  if (user && isInLibrary) {
    return (
      <form action={removeAnimeFromLibrary}>
        <input type="hidden" name="anime_id" value={id} />
        <input type="hidden" name="user_id" value={user.id} />
        <Button className="w-full" type="submit">
          Remove from Library
        </Button>
      </form>
    );
  } else if (user && !isInLibrary) {
    return (
      <form action={addAnimeToLibrary}>
        <input type="hidden" name="anime_id" value={id} />
        <input type="hidden" name="user_id" value={user.id} />
        <input type="hidden" name="list_type" value="Library" />
        <Button className="w-full" type="submit">
          Add to Library
        </Button>
      </form>
    );
  }
}
