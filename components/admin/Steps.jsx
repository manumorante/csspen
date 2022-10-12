import { PlusCircleIcon } from '@heroicons/react/20/solid'
import Step from './Step'

export default function Steps({ pen, steps, ...actions }) {
  return (
    <div className='Steps flex snap-x gap-4 overflow-x-auto sm:p-4'>
      {steps.map((step) => {
        return (
          <Step
            key={step.num}
            penID={pen.id}
            num={step.num}
            html={pen.html}
            css={step.css}
            info={step.info}
            brandcolor={pen.brandcolor}
            textcolor={pen.textcolor}
            bgcolor={pen.bgcolor}
            total={steps.length}
            {...actions}
          />
        )
      })}

      <div
        className='Step w-20 max-h-[calc(100vh-80px)] sm:w-40 my-6 shrink-0 snap-center mr-[25%] rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out'
        onClick={() => createStep({ penID: pen.id, num: steps.length + 1, css: '', info: '' })}>
        <PlusCircleIcon className='h-12 w-12 text-white/50' />
      </div>
    </div>
  )
}
