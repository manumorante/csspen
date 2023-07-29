import cx from "clsx"

export default function Code({ css }: { css: string }) {
  const mainCx = cx("Code relative w-full h-full overflow-y-auto")
  const textAreaCx = cx(
    "TextArea h-full w-full m-0 p-4 border-0 bg-transparent",
    "whitespace-pre-wrap break-all resize-none overflow-hidden"
  )

  return (
    <div className={mainCx}>
      <textarea
        className={textAreaCx}
        readOnly={true}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-gramm={false}
        value={css}
      />
    </div>
  )
}
