import { PenRepository } from '../js/PenRepository'
import { penMapper } from '../js/penMapper'

export class GetPenByIDUseCase {
  async execute({ penID }) {
    if (!penID) {
      console.error(`GetPenByIDUseCase() penID(${penID})`)
      return false
    }

    const repository = new PenRepository()

    const [pen, steps] = await Promise.all([
      repository.getPen(penID),
      repository.getSteps(penID),
    ])

    const penMapped = penMapper({ pen, steps })
    if (!penMapped) {
      console.error(`GetPenByIDUseCase() penMapped({ pen: ${penID}, steps: ${steps} })`)
      return false
    }

    return penMapped
  }
}
