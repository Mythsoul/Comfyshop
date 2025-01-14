import { useEffect, useState } from 'react'
import { Menu, ShoppingCart, Search, X, ChevronRight, Heart, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '@/store/Authslice'
import Previewcard from '@/components/Preview-card'
export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <a href="/new" className="block text-lg text-gray-900">New</a>
                    <a href="/bestsellers" className="block text-lg text-gray-900">Bestsellers</a>
                    <a href="/categories" className="block text-lg text-gray-900">Categories</a>
                    <a href="/sale" className="block text-lg text-gray-900">Sale</a>
                  </div>
                </SheetContent>
              </Sheet>
              <a href="/" className="ml-4 md:ml-0">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wider">COMFYSHOP</h1>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a href="/new" className="text-gray-900 hover:text-gray-600">New</a>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <img
                     
                        className="rounded-lg"
                        width={100}
                        height={100}
                        alt="New arrival preview"
                      />
                      <div>
                        <h4 className="font-semibold">Latest Arrivals</h4>
                        <p className="text-sm text-muted-foreground">Discover our newest collections</p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <a href="/bestsellers" className="text-gray-900 hover:text-gray-600">Bestsellers</a>
              <a href="/categories" className="text-gray-900 hover:text-gray-600">Categories</a>
              <a href="/sale" className="text-gray-900 hover:text-gray-600 flex items-center gap-2">
                Sale
                <Badge variant="destructive" className="text-xs">Up to 70% off</Badge>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <Previewcard />
      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-gray-400 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="bg-white/10 border-white/20" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ComfyShop is your destination for premium comfort furniture and home accessories.
              We believe in quality, style, and affordability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ComfyShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

