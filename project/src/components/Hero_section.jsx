    
    
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
