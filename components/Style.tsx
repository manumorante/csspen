export default function Style({ css }: { css: string }) {
  return (
    <style type="text/css" dangerouslySetInnerHTML={{ __html: css }}></style>
  )
}
