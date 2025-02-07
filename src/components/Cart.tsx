import React from 'react'
import { Button } from '../components/ui/button'
import { Trash2 } from 'lucide-react'

interface Course {
  id: number
  imagen: string
  titulo: string
  precio: number
  instructor: string
  purchased: boolean
  slug: string
}

interface CartProps {
  courses: Course[]
}

const Cart: React.FC<CartProps> = ({ courses }) => {
  const calculateTotal = () => {
    return courses.reduce((total, course) => total + course.precio, 0).toFixed(2)
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Carrito de Cursos</h2>
      
      <div className="space-y-4">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex flex-row items-center space-x-4">
              <img 
                src={course.imagen} 
                alt={course.titulo} 
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-sm">{course.titulo}</h3>
                <p className="text-muted-foreground text-xs">
                  Por {course.instructor}
                </p>
                <p className="text-primary font-bold">
                  ${course.precio.toFixed(2)}
                </p>
              </div>
            </div>
            
            <Button variant="destructive" size="icon" className="h-8 w-8 ml-2">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">${calculateTotal()}</span>
      </div>
      
      <Button 
        className="w-full mt-4" 
      >
        Finalizar Compra
      </Button>
    </div>
  )
}

export default Cart