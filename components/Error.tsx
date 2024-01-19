export default function Error({ msg, log }: { msg: string; log?: Array<any> }) {
  console.error(msg)
  console.log(log)

  return (
    <div className="w-full h-full grid place-items-center">
      <p className="font-bold">Error</p>
      {msg && <p className="font-light">{msg}</p>}
    </div>
  )
}
