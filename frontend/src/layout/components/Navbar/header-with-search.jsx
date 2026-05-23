import React from "react";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  CircleHelpIcon,
  UserCircle2Icon,
} from "lucide-react";

import { Sheet, SheetContent, SheetFooter } from "@/layout/components/Navbar/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/layout/components/Navbar/search-modal";
import magerLogo from "@/assets/mager.svg";

export function Header() {
  const [open, setOpen] = React.useState(false);

  const links = [
    // {
    // 	label: 'Features',
    // 	href: '#',
    // },
    // {
    // 	label: 'Pricing',
    // 	href: '#',
    // },
    // {
    // 	label: 'About',
    // 	href: '#',
    // },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b-2 border-foreground backdrop-blur-lg",
        "bg-secondary supports-[backdrop-filter]:bg-secondary/80",
      )}
    >
      <nav className="relative flex h-14 items-center justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
            <img src={magerLogo} alt="Mager" className="h-6 w-auto" />
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({ variant: "ghost" })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CENTER SEARCH */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <SearchModal data={blogs}>
            <Button
              variant="outline"
              className="relative hidden h-9 w-[320px] justify-between px-3 py-2 md:flex"
            >
              <span className="text-muted-foreground">Cari...</span>

              <div className="flex items-center gap-2">
                <SearchIcon className="size-4" />
              </div>
            </Button>
          </SearchModal>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="hidden md:flex">
            <BellIcon className="size-5" />
          </Button>

          <Button size="icon" variant="ghost" className="hidden md:flex">
            <CircleHelpIcon className="size-5" />
          </Button>

          <Button size="icon" variant="ghost" className="hidden md:flex">
            <UserCircle2Icon className="size-5" />
          </Button>

          {/* MOBILE MENU */}
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            >
              <MenuIcon className="size-4" />
            </Button>

            <SheetContent
              className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
              showClose={false}
              side="left"
            >
              <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start",
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <SheetFooter>
                <Button variant="outline">Sign In</Button>
                <Button>Get Started</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

const blogs = [
  {
    id: "blog-1",
    title: "The Future of Web Dev",
    description: "A quick look at upcoming web technologies.",
    category: "Web Dev",
  },
  {
    id: "blog-2",
    title: "Minimalist Design Tips",
    description: "Learn how less can often be more in UI design.",
    category: "Design",
  },
  {
    id: "blog-3",
    title: "Boosting Page Speed",
    description: "Simple tricks to make your site load faster.",
    category: "Performance",
  },
  {
    id: "blog-4",
    title: "Intro to TypeScript",
    description: "Why TypeScript makes JavaScript safer and clearer.",
    category: "Programming",
  },
  {
    id: "blog-5",
    title: "Dark Mode Design",
    description: "Best practices for building a dark theme UI.",
    category: "Design",
  },
  {
    id: "blog-6",
    title: "Understanding APIs",
    description: "Breaking down REST and GraphQL for beginners.",
    category: "Backend",
  },
  {
    id: "blog-7",
    title: "CSS Grid Basics",
    description: "A quick guide to building layouts with CSS Grid.",
    category: "Frontend",
  },
  {
    id: "blog-8",
    title: "React State Management",
    description: "Exploring useState, Redux, and other options.",
    category: "Frontend",
  },
  {
    id: "blog-9",
    title: "SEO in 2025",
    description: "Trends and tips to rank higher on Google.",
    category: "SEO",
  },
  {
    id: "blog-10",
    title: "Debugging Like a Pro",
    description: "Tools and techniques to fix bugs faster.",
    category: "Programming",
  },
];
