import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialProps {
  testimonial: {
    id: number
    name: string
    position: string
    content: string
    avatar: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
        <Quote className="h-5 w-5 text-teal-700" />
      </div>
      <p className="text-gray-600 mb-6 italic">{testimonial.content}</p>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.position}</p>
        </div>
      </div>
    </div>
  )
}

