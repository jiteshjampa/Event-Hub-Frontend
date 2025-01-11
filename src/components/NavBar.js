import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, User, Calendar, ListTodo, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function NavBar() {
  const mainNav = [
    {
      title: "Attendee",
      href: "/attendees",
      description: "Browse and manage all your events",
      icon: Calendar,
    },
    {
      title: "Tasks",
      href: "/tasks",
      description: "Track and organize event tasks",
      icon: ListTodo,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 ml-4 lg:ml-0">
          <span className="font-bold text-xl">EventHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger>
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <item.icon className="h-6 w-6 mb-2" />
                            <div className="mb-2 text-lg font-medium">
                              {item.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search and Auth Buttons */}
        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
