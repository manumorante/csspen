function ColorBox({ color }) {
  return (
    <div>
      <div className='w-6 h-6 border border-dotted border-black/20' style={{ background: color }} />
      {/* <div className='uppercase text-xs font-mono'>{color}</div> */}
    </div>
  )
}

export default function Colors({ colors }) {
  return (
    <div className='flex gap-2'>
      <ColorBox color={colors.c1} />
      <ColorBox color={colors.c2} />
      <ColorBox color={colors.c3} />
    </div>
  )
}
