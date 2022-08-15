import { PenRepository } from '../database/PenRepository'

export class DeleteStepUseCase {
  async execute({ penID, stepNum }) {
    const repository = new PenRepository()

    const result = await repository.deleteStep({ penID, stepNum })

    return result
  }
}
