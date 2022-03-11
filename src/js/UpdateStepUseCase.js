import { PenRepository } from './PenRepository'

export class UpdateStepUseCase {
  async execute({ penID, step, code, info = '' }) {
    const repository = new PenRepository()

    const result = await repository.updateStep({ penID, step, code, info })

    return result
  }
}
