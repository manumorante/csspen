import { PenRepository } from './PenRepository'

export class GetLastStepUseCase {
  async execute({ penID }) {
    const repository = new PenRepository()
    const step = await repository.getLastStep(penID)

    return step
  }
}
