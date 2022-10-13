import Step from './Step'

export default function Steps({ pen, steps, updateStep, createStep, deleteStep }) {
  return (
    <div className='Steps flex items-start snap-x gap-4 overflow-x-auto'>
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
            updateStep={updateStep}
            createStep={createStep}
            deleteStep={deleteStep}
          />
        )
      })}
    </div>
  )
}
