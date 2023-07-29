import cx from "clsx"
import { Pen } from "@/types"

export default function PenInfo({ pen }: { pen: Pen }) {
  const { name, info, bgcolor, textcolor } = pen

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const mainCx = cx("PenInfo flex gap-2 xs:gap-3 items-center p-2 xs:p-4")
  const avatarCx = cx(
    "Avatar w-6 h-6 xs:w-10 xs:h-10",
    "flex items-center justify-center",
    "leading-0 text-lg xs:text-xl font-extrabold text-white",
    "rounded-full"
  )
  const avatarStyle = { color: textcolor, backgroundColor: bgcolor }

  return (
    <div className={mainCx}>
      <div className={avatarCx} style={avatarStyle}>
        {initials}
      </div>
      <div className="flex gap-2 xs:block text-sm xs:text-lg xs:leading-6">
        <div className="text-white font-semibold">{name}</div>
        <div className="text-white/60 text-ellipsis whitespace-nowrap">
          {info}
        </div>
      </div>
    </div>
  )
}
