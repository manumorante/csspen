import { PenRepository } from '../database/PenRepository'

export class GetPensUseCase {
  async execute() {
    const repository = new PenRepository()
    const pens = await repository.getPens()

    return pens
  }
}
