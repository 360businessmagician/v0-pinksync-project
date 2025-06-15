import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  )
}
