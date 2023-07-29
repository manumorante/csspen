import cx from "clsx"
import CodeStep from "@/components/admin/CodeStep"
import { Pen } from "@/types"

export default function CodeStepList({
  pen,
  updateStep,
  createStep,
  deleteStep,
}: {
  pen: Pen
  updateStep?: any
  createStep?: any
  deleteStep?: any
}) {
  const mainCx = cx("Steps ml-16 flex items-start snap-x gap-4 overflow-x-auto")

  return (
    <div className={mainCx}>
      {pen.steps.map((step) => {
        return (
          <CodeStep
            key={step.num}
            pen={pen}
            // 
            penID={pen.id}
            num={step.num}
            html={pen.html}
            css={step.css}
            info={step.info}
            brandcolor={pen.brandcolor}
            textcolor={pen.textcolor}
            bgcolor={pen.bgcolor}
            total={pen.steps.length}
            updateStep={updateStep}
            createStep={createStep}
            deleteStep={deleteStep}
          />
        )
      })}
    </div>
  )
}
