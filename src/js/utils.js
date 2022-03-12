export default class Utils {
  constructor(state) {
    this.state = state
  }

  // Steps
  getSteps() {
    return !!this.state.steps?.length ? this.state.steps : []
  }

  // Step
  getStep(stepNumber) {
    const steps = this.getSteps()
    return steps[stepNumber] || false
  }

  // First step
  getFirstStep() {
    const steps = this.getSteps()
    return steps[0] || false
  }

  // Last step
  getLastStep() {
    const steps = this.getSteps()
    return steps[steps.length - 1] || false
  }

  // Get a property from current step
  getStepProp(steps, stepNumber, prop) {
    const step = this.getStep(steps, stepNumber)
    return step && step[prop]
  }

  // Get the property info from current step
  getStepInfo(steps, stepNumber) {
    return this.getStepProp(steps, stepNumber, 'info')
  }

  // Get the property code from current step
  getStepCode(steps, stepNumber) {
    return this.getStepProp(steps, stepNumber, 'code')
  }

  // Check if step is the first step
  isFirstStep() {
    return this.state.step === 0
  }

  // Check if step is the last step
  isLastStep() {
    return this.state.step === this.state.steps.length - 1
  }

  // Check if current user can edit the pen (only me ...)
  canEdit() {
    return this.state.email === 'manu@estadologico.com'
  }
}
