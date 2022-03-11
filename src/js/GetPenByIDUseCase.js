import { PenRepository } from '../js/PenRepository'
import { penMapper } from '../js/penMapper'

export class GetPenByIDUseCase {
  async execute({ penID }) {
    const repository = new PenRepository()
    // TODO use Promise.all()
    const pen = await repository.getPen(penID)
    const steps = await repository.getSteps(penID)
    const penMapped = penMapper(pen, steps)

    return penMapped
  }
}
