import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ServiceProps {
  service: {
    id: string | number
    title: string
    description: string
    image: string
    date: Date | string
    icon?: string
    link?: string
  }
}

export default function ServiceCard({ service }: ServiceProps) {
  // Format date if it's a Date object or ISO string
  const formattedDate = service.date ? formatDate(service.date) : ""

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group">
      <div className="relative h-64">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <Image
                src={service.icon || "/logo.png"}
                alt={`${service.title} icon`}
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </div>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>
          <p className="text-white/90 text-sm line-clamp-2">{service.description}</p>
        </div>
      </div>
      <div className="p-6 flex justify-between items-center">
        <Link
          href={service.link || `/news/${service.id}`}
          className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
        >
          Tìm hiểu thêm
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        {formattedDate && <span className="text-sm text-gray-500">{formattedDate}</span>}
      </div>
    </div>
  )
}

