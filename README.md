[![time tracker](https://wakatime.com/badge/github/manumorante/css.learn.svg)](https://wakatime.com/badge/github/manumorante/css.learn)

# Learning & Presentation CSS Tool

![](public/csspen_og.png)

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn deploy`

`gh-pages` hosting for `build` folder.

## TODO

- Improvements
  - [x] Migrate JSON to database `supabase`
  - [x] `useReducer` to update data (current step, step info, ...)
  - [x] Rewind to previous step quickly
  - [x] Show step line progress
  - [x] Control using keys
  - [ ] Placeholder loading
  - [ ] Pen description panel about what, author, links, ...
  - [ ] Fullscreen version (hide code) in mobile
  - [ ] Editor: Monaco Editor - https://microsoft.github.io/monaco-editor/
  - [ ] Thumbnail for pens card in list
  - [ ] OG image for each Pen
  - [ ] Light/Dark theme
- Bugs:
  - [x] En móvil, cuando hay poco código se queda centrado vertital. Debería estar arriba.
  - [x] Durante el autoplay se cierra el menu.
