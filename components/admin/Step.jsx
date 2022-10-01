import React, { useState } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie } from 'database'
import { PlusCircleIcon, TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'
import StepEditor from '@/admin/StepEditor'

// function Options({ isFirst, isLast }) {
//   return (
//     <div className='flex py-2 justify-between gap-2'>
//       {isLast && !isFirst && (
//         <Button onClick={() => handleDeleteStep({ num: step.num })}>
//           <TrashIcon />
//         </Button>
//       )}

//       {/* {isNew && (
//         <>
//           <Button onClick={() => cancelNewStep(i)}>
//             <ArrowUturnLeftIcon />
//           </Button>
//           <Button onClick={() => saveNewStep({ step: step.num, info: step.info, css: step.css })}>Save</Button>
//         </>
//       )} */}
//     </div>
//   )
// }

export default function Step({ i, html, css: initialCSS, bg }) {
  const [css, setCss] = useState(initialCSS)

  const onChange = (value) => {
    setCss(value)
  }

  return (
    <div>
      <div className='Step snap-center grow sm:grow-0'>
        <div className='w-screen sm:w-80 h-auto'>
          {/* <Options isFirst={isFirst} isLast={isLast} /> */}
          <StepEditor i={i} html={html} bg={bg} css={css} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
