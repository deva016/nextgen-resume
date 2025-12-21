import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar - consistent with other pages */}
      <header className="shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">
              AI Resume Builder
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {userId ? (
              <>
                <ThemeToggle />
                <UserButton
                  appearance={{
                    baseTheme: dark,
                    elements: {
                      avatarBox: {
                        width: 35,
                        height: 35,
                      },
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/sign-up">Sign up</Link>
                </Button>
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">

        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="relative space-y-8">
              {/* Decorative circle */}
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-orange-100 opacity-50" />
              
              {/* Decorative triangle */}
              <div className="absolute -right-4 -top-8 h-0 w-0 border-b-[60px] border-l-[60px] border-b-transparent border-l-orange-200 opacity-60" />

              <div className="relative space-y-6">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                  Create a{" "}
                  <span className="text-orange-500">resume</span> that secures
                  your <span className="text-orange-500">dream job</span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                  Build a resume that piques the interest of recruiters and gets
                  you hired. It&apos;s fast and easy to use.
                </p>

                <div className="relative inline-block">
                  {/* Decorative dotted box */}
                  <div className="absolute -right-16 top-2 h-16 w-16 rounded-lg border-2 border-dashed border-orange-300" />

                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-orange-500 px-12 py-6 text-lg font-semibold hover:bg-orange-600"
                  >
                    <Link href="/resumes">Try for free</Link>
                  </Button>
                </div>
              </div>
              
              {/* Decorative circle */}
              <div className="absolute -bottom-8 right-8 h-32 w-32 rounded-full bg-orange-100 opacity-50" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
