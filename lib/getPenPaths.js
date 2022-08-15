import { GetPensUseCase } from '../useCases/GetPensUseCase'

export async function getPenPaths() {
  const GetPens = new GetPensUseCase()
  const pens = await GetPens.execute()
  const paths = []
  pens.forEach((pen) => paths.push(`/${pen.id}`))

  return paths
}
