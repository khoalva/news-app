import Link from "next/link"
import { Newspaper } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Newspaper className="h-6 w-6" />
          <span className="font-bold text-xl">NewsHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/categories/technology" className="text-sm font-medium hover:underline underline-offset-4">
            Technology
          </Link>
          <Link href="/categories/business" className="text-sm font-medium hover:underline underline-offset-4">
            Business
          </Link>
          <Link href="/categories/science" className="text-sm font-medium hover:underline underline-offset-4">
            Science
          </Link>
          <Link href="/categories/health" className="text-sm font-medium hover:underline underline-offset-4">
            Health
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

