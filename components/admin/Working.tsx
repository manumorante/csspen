import { ArrowPathIcon } from "@heroicons/react/20/solid"

export default function Workikng({ working }: { working?: any }) {
  if (!working) return null

  return (
    <div className="fixed z-50 inset-0 bg-blue-900/70 flex items-center justify-center">
      <div className="text-gray-300 flex items-center gap-3">
        <ArrowPathIcon className="w-8 h-8 animate-spin" />
        {working}
      </div>
    </div>
  )
}
