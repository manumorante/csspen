import cx from "clsx"
import CodeMirror from "@uiw/react-codemirror"
import { myTheme } from "@/utils/myTheme"
import { css as codeCSS } from "@codemirror/lang-css"

export default function Code({ css }: { css: string }) {
  const mainCx = cx("Code relative w-full h-full overflow-y-auto")

  return (
    <div className={mainCx}>
      <CodeMirror
        className="h-full w-full"
        value={css}
        width="100%"
        height="100%"
        theme={myTheme}
        extensions={[codeCSS()]}
      />
    </div>
  )
}
