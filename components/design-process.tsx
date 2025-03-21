import { CheckCircle } from "lucide-react"

export default function DesignProcess() {
  const steps = [
    {
      id: 1,
      title: "Tư vấn khảo sát",
      description: "Gặp gỡ, trao đổi và khảo sát hiện trạng để hiểu rõ nhu cầu của khách hàng.",
    },
    {
      id: 2,
      title: "Lên ý tưởng thiết kế",
      description: "Phát triển ý tưởng thiết kế dựa trên yêu cầu và phong cách của khách hàng.",
    },
    {
      id: 3,
      title: "Thiết kế sơ bộ",
      description: "Tạo bản vẽ sơ bộ và phối cảnh 3D để khách hàng có cái nhìn tổng quan.",
    },
    {
      id: 4,
      title: "Thiết kế chi tiết",
      description: "Hoàn thiện bản vẽ kỹ thuật, chi tiết vật liệu và dự toán chi phí.",
    },
    {
      id: 5,
      title: "Thi công",
      description: "Triển khai thi công theo đúng thiết kế đã được phê duyệt.",
    },
    {
      id: 6,
      title: "Nghiệm thu bàn giao",
      description: "Kiểm tra chất lượng và bàn giao công trình hoàn thiện cho khách hàng.",
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
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

