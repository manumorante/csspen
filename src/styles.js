export const layout = {
  main: 'w-screen h-screen flex flex-col overflow-hidden',
  header: 'h-10 flex-none',
  pen: 'flex-grow flex flex-col sm:flex-row sm:w-full sm:h-full',
  list: {
    base: 'sm:block sm:relative sm:w-52 bg-neutral-900',
    closed: 'hidden',
    open: 'absolute z-30 inset-0',
    items:
      'absolute z-20 top-0 left-0 w-full h-full overflow-y-scroll flex flex-col',
  },
  editor:
    'flex flex-col overflow-hidden h-1/2 md:w-96 lg:w-[460px] sm:h-full sm:flex sm:flex-col',
  stage: {
    base: 'flex-grow relative',
    html: 'grid place-items-center h-full',
  },
  progress: {
    base: 'absolute left-0 bottom-10 w-full flex gap-2 justify-center',
    item: {
      base: 'base - block w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out',
      simple: 'simple - text-gray-500 bg-gray-900',
      active: 'active - text-black bg-white font-bold',
      complete: 'complete - text-gray-300  bg-gray-700',
    },
  },
  footer: 'h-10 flex-none',
}
