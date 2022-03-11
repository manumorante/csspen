import { PenRepository } from '../js/PenRepository'

export class GetPenByIDUseCase {
  async execute({ penID }) {
    const repository = new PenRepository()
    const penVO = await repository.getPen(penID)
    return penVO
  }
}
