import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

export default function Error({ error }: { error?: any }) {
  if (!error) return null

  return (
    <div className="fixed z-50 inset-0 bg-red-900/70 flex items-center justify-center">
      <div className="text-gray-300 flex items-center gap-3">
        <ExclamationCircleIcon className="w-8 h-8" />
        {error}
      </div>
    </div>
  )
}
