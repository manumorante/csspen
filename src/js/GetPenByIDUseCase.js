import { PenRepository } from '../js/PenRepository'
import { penMapper } from '../js/penMapper'

export class GetPenByIDUseCase {
  async execute({ penID }) {
    const repository = new PenRepository()

    const [pen, steps] = await Promise.all([
      repository.getPen(penID),
      repository.getSteps(penID),
    ])

    const penMapped = penMapper(pen, steps)
    return penMapped
  }
}
