const layout = {
  main: 'w-screen h-screen grid grid-rows-[32px_auto_32px] overflow-hidden',
  header: 'flex gap-1 p-2 items-center justify-between',
  footer: 'p-2 text-center text-sm text-neutral-600',
  pen: 'overflow-y-auto grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[200px_400px_auto]',
  list: 'hidden sm:block sm:relative bg-neutral-900',
  items:
    'absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col',
  editor: 'p-6 sm:h-full overflow-y-auto',
  stage: 'overflow-hidden sm:h-full relative',
  html: 'grid place-items-center h-full',
  progress: 'absolute hidden left-0 right-0 bottom-10 sm:flex gap-2 justify-center overflow-hidden',
  progressStep: {
    base: 'block w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out',
    simple: 'text-gray-500 bg-gray-900',
    active: 'text-black bg-white font-bold',
    complete: 'text-gray-300  bg-gray-700',
  },
}

export const styles = {
  layout: {
    name: 'Layout',
    description: 'The main estructure of the app, just two levels of depth.',
    styles: layout,
  },

  debug: {
    name: 'Debug',
    description: 'Debug styles for development.',
    styles: 'border-dashed border-2 border-neutral-600',
  },
}
