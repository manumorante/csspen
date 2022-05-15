import { PenRepository } from './PenRepository'

export class NewStepUseCase {
  async execute({ pen_id, num, info, css }) {
    const repository = new PenRepository()

    const result = await repository.newStep({ pen_id, num, info, css })

    return result
  }
}
