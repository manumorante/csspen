export const layout = {
  main: 'w-screen h-screen flex flex-col overflow-hidden',
  header: 'h-10 flex-none',
  pen: 'flex-grow flex flex-col sm:flex-row sm:w-full sm:h-full',
  menu: {
    base: 'sm:block sm:relative sm:w-52 bg-neutral-900',
    closed: 'hidden',
    open: 'absolute z-30 inset-0',
    items:
      'absolute z-20 top-0 left-0 w-full h-full overflow-y-scroll flex flex-col',
  },
  editor:
    'flex flex-col overflow-hidden h-1/2 sm:w-96 sm:h-full sm:flex sm:flex-col',
  stage: {
    base: 'flex-grow ',
    html: 'grid place-items-center h-full',
  },
  footer: 'h-10 flex-none',
}
