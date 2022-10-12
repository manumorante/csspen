import Button from '@/Button'
import { BoltIcon } from '@heroicons/react/20/solid'

export default function PenForm({ defaults, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    let isInvalid = false
    const data = {}
    dataForm.forEach((value, input) => {
      if (!value) isInvalid = true
      data[input] = value
    })

    if (isInvalid) return

    onSubmit(data)
  }

  const Field = ({ id, name }) => {
    return (
      <div className='Field'>
        <label htmlFor={id} className='label'>
          {name}
        </label>
        <input id={id} name={id} defaultValue={defaults?.[id]} placeholder={name} type='text' className='input' />
      </div>
    )
  }

  const FieldColor = ({ id, name }) => {
    const onChange = (e) => {
      const colorbox = document.querySelector(`.js-${id}-colorbox`)
      colorbox.style.backgroundColor = e.target.value
    }

    return (
      <div className='FieldColor'>
        <label htmlFor={id} className='label'>
          {name}
        </label>
        <div className='flex items-center gap-1'>
          <aside className={`w-8 h-8 rounded js-${id}-colorbox`} style={{ background: defaults?.[id] }} />
          <input
            id={id}
            name={id}
            defaultValue={defaults?.[id]}
            placeholder={name}
            type='text'
            className='input'
            onChange={onChange}
          />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='child:w-full child:mb-6'>
        <Field id='id' name='ID' />
        <Field id='name' name='Name' />
        <Field id='info' name='Info' />
        <Field id='html' name='HTML' />
        <FieldColor id='brandcolor' name='Brand color' />
        <FieldColor id='textcolor' name='Text' />
        <FieldColor id='bgcolor' name='Background' />
      </div>

      <Button submit label='Submit' icon={<BoltIcon />} />
    </form>
  )
}
