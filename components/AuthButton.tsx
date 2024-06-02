import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = null;
  if (user?.id) {
    const { data, error } = await supabase
      .from("profile")
      .select("username")
      .eq("id", user.id)
      .single();
    if (error) {
      console.error("Failed to fetch username:", error.message);
    } else {
      username = data?.username;
    }
  }

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={`/profile/${username}`}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </Link>

      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login/Sign Up
    </Link>
  );
}
