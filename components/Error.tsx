export default function Error({ msg }: { msg?: Array<any> }) {
  return (
    <div className="w-full h-full grid place-items-center">
      <p className="font-bold">Error</p>
      {msg && msg.length > 0 && (
        <>
          {msg.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </>
      )}
    </div>
  )
}
