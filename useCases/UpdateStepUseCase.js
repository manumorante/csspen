import { PenRepository } from '../database/PenRepository'

export class UpdateStepUseCase {
  async execute({ penID, step, css, info = '' }) {
    const repository = new PenRepository()

    const result = await repository.updateStep({ penID, step, css, info })

    return result
  }
}
