import { CheckCircle } from "lucide-react"

export default function DesignProcess() {
  const steps = [
    {
      id: 1,
      title: "Chọn dự án",
      description: "• Chọn dự án bạn quan tâm",
    },
    {
      id: 2,
      title: "Chọn căn hộ",
      description: "• Chọn căn hộ bạn muốn xem thiết kế",
    },
    {
      id: 3,
      title: "Xem thiết kế",
      description: "• Xem và tìm hiểu các phương án thiết kế",
    },
    {
      id: 4,
      title: "Chọn phương án",
      description: "• Lựa chọn các phương án thiết kế bạn thích",
    },
    {
      id: 5,
      title: "Tải thiết kế",
      description: "• Tải thiết kế miễn phí \n• Liên hệ cấp báo giá theo thiết kế \n• Chỉnh sửa thiết kế (nếu bạn muốn)",
    },
    {
      id: 6,
      title: "Nghiệm thu bàn giao",
      description: "• Kiểm tra chất lượng và bàn giao công trình hoàn thiện cho khách hàng.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div key={step.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-teal-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                <span className="text-teal-700 mr-2">{step.id}.</span>
                {step.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

