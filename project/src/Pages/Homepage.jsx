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
export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [user , setuser] = useState({ 
   username : "",
   email : "", 

  })
  const dispatch = useDispatch(); 
  
    const getRandomImage = (category) => {
    // Return a static URL directly
    return "https://source.unsplash.com/random/800x600?" + category;
  }
  axios.defaults.withCredentials = true;
useEffect(()=>{ 
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_CHECK_AUTH_URL);
      if (response.status === 200 && response.data) { 
        dispatch(login(response.data));
        setuser(response.data);

      }
    } catch (error) {
      console.error('Failed to check auth status', error);
    }

  }

  checkAuthStatus(); 
  
  
} , []);

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
                        src={getRandomImage('furniture')}
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

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[60vh] md:h-[80vh] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getRandomImage('living+room')}
                alt="Hero image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">New Collection</h2>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['bedroom', 'office', 'kitchen', 'bathroom'].map((category, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                  <img
                    src={getRandomImage(category)}
                    alt={`Featured ${category}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" className="w-full">
                      Quick View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button variant="ghost" className="flex items-center gap-2">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['sofa', 'chair', 'table', 'lamp'].map((item, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={getRandomImage(item)}
                    alt={`Product ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary">New Arrival</Badge>
                  <h3 className="text-lg font-medium">Comfort {item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">$199.99</p>
                    <Button variant="ghost" size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Living Room', items: '120+ Products', image: 'living+room' },
              { name: 'Bedroom', items: '90+ Products', image: 'bedroom' },
              { name: 'Office', items: '75+ Products', image: 'office' }
            ].map((category) => (
              <div key={category.name} className="relative h-80 group cursor-pointer">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <img
                    src={getRandomImage(category.image)}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm mb-4">{category.items}</p>
                  <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

