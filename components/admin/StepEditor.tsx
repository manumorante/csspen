import cx from "clsx"
import { addScope } from "@/utils/css"
import CodeMirror from "@uiw/react-codemirror"
import { myTheme } from "@/utils/myTheme"
import { css as codeCSS } from "@codemirror/lang-css"

function StepEditor({ num, html, css, onChange, onFocus, onBlur }: Props) {
  const scopedCSS = addScope(css, ".step-" + num)

  function Preview() {
    return (
      <div className={cx("Preview shrink-0 relative w-full h-64")}>
        <div
          className={`step-${num} absolute inset-0 grid place-items-center w-pen h-pen m-auto overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: scopedCSS }}
        />
      </div>
    )
  }

  return (
    <div
      className={cx("StepEditor w-full flex items-stretch", {
        "flex-col": true,
      })}
    >
      <Preview />
      <CodeMirror
        value={css}
        width="100%"
        height="100%"
        theme={myTheme}
        extensions={[codeCSS()]}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default StepEditor

type Props = {
  num: number
  html: string
  css: string
  onChange?: any
  onFocus?: any
  onBlur?: any
}
