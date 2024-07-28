/**
 * En modo server, el layout protege todas las páginas del admin.
 * Contiene la 'carcasa' de diseno del admin.
 */
import { createClient } from "@/utils/supabase/server"

import cx from "clsx"
import Btn from "@/components/Btn"
import LogoutButton from "@/components/LogoutButton"
import { redirect } from "next/navigation"
import Link from "next/link"
export const dynamic = "force-dynamic"

async function Admin({ children }: { children: React.ReactNode }) {
  // Auth
  let supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Styles
  const mainCx = cx("AdminLayout w-full h-full", "flex")
  const activityBarCx = cx(
    "Menu",
    "w-16 h-full p-3",
    "bg-black/20",
    "flex flex-col gap-3 justify-between items-center"
  )
  const itemsCx = cx("flex flex-col gap-3 items-center")

  return (
    <div className={mainCx}>
      <div className={activityBarCx}>
        <div className={itemsCx}>csspen</div>
        <div className={itemsCx}>
          {user && <LogoutButton />}

          {!user && (
            <Link href="/login" className={Btn.cx}>
              Log
            </Link>
          )}
        </div>
      </div>

      <main className="w-full h-full">{children}</main>
    </div>
  )
}
export default Admin
