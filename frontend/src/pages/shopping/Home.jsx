import React from 'react'
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import banner3 from "../../assets/banner3.png"
import { Button } from '@/components/ui/button'
import { Armchair, BoomBox, ChevronLeft, ChevronRight, Dumbbell, LibraryBig, Puzzle, ShoppingBasket, WandSparkles, WashingMachine } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Home = () => {
  const slides = [banner1, banner2, banner3]
  const categories = [
    { id: "electronics", label: "Electronics", icon: BoomBox },
    { id: "appliances", label: "Appliances", icon: WashingMachine },
    { id: "furniture", label: "Furniture", icon: Armchair },
    { id: "groceries", label: "Groceries", icon: ShoppingBasket },
    { id: "books", label: "Books", icon: LibraryBig },
    { id: "toys", label: "Toys", icon: Puzzle },
    { id: "beauty", label: "Beauty & Personal Care", icon: WandSparkles },
    { id: "sports", label: "Sports & Fitness", icon: Dumbbell },
  ]

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          slides.map((slide, index) => (
            <img
              src={slide}
              key={index}
              className='absolute top-0 left-0 w-full object-cover transition-opacity duration-1000'
            />
          ))
        }
        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-slate-200"
          variant="outline"
          size="icon">
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-slate-200"
          variant="outline"
          size="icon">
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              categories.map(categoryItem =>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                    <span className='font-bold'>
                      {categoryItem.label}
                    </span>
                  </CardContent>
                </Card>)
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 