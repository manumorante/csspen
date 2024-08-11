import { User as SuppaUser } from "@supabase/supabase-js"

export interface User extends SuppaUser {}

export interface Step {
  num: number
  pen_id: string
  info: string
  css: string
}

export interface Pen {
  id: string
  name: string
  info: string
  html: string
  order: number
  visible: boolean
  textcolor: string
  bgcolor: string
  brandcolor: string
  steps: Step[]
}

interface State {
  pens: Pen[]
  pen: Pen
  nextPen: Pen
  prevPen: Pen
  step: number
  currentCSS: string
  currentInfo: string
  isFirstStep: boolean
  isLastStep: boolean
  isPlaying: boolean
  codeFull: boolean
  codeMid: boolean
  codeHide: boolean
}

interface StateStep {
  html: string
  css: string
  _css: string
  info: string
  _info: string
  focus: boolean
  edited: boolean
}

interface StateAdmin {
  penID: string
  pens?: Pen[]
  pen?: Pen
  steps?: Step[]
  loading?: boolean
  working?: boolean
  workingMsg?: string
  error?: boolean
  errorMsg?: string
}
