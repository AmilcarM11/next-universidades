import { University } from '../types'

const EP_UNIVERSIDADES = 'https://api.wuolah.com/v2/universities'

export async function getUnivesitiesByPage(
  page: number,
): Promise<{ data: University[]; nextPage?: number }> {
  const options = {
    'pagination[withCount]': 'true',
    'pagination[pageSize]': '20',
    'pagination[page]': String(page),
    sort: 'id', // TODO: sort by name?
  }

  const queryParams = new URLSearchParams(options).toString()

  try {
    const { data, meta } = await fetch(`${EP_UNIVERSIDADES}?${queryParams}`).then(res => res.json())

    // Determinar si hay más elementos en la página siguiente
    const { total, page, pageSize } = meta.pagination
    const hasNext: boolean = total > page * pageSize
    if (hasNext) {
      return { data, nextPage: page + 1 }
    }
    return { data }
  } catch (error) {
    return { data: [] }
  }
}

export async function getTopUnivesities(): Promise<University[]> {
  // TODO: consumir EP de universidades más populares.
  // por el momento se utilizan las primeras de la lista.
  const { data } = await getUnivesitiesByPage(0)
  return data
}

export async function getUnivesityProps(slugUniversidad: string) {
  try {
    return await fetch(`${EP_UNIVERSIDADES}/${slugUniversidad}`).then(res => res.json())
  } catch (error) {
    console.error('Problema al obtener props de universidad: ' + slugUniversidad, error)
    return null
  }
}
