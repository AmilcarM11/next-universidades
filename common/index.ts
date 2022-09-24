import { University } from '../types'

const EP_UNIVERSIDADES = 'https://api.wuolah.com/v2/universities'

export async function getUnivesitiesByPage(page: number): Promise<University[]> {
  const options = {
    'pagination[pageSize]': '20',
    'pagination[page]': String(page),
    sort: 'id', // TODO: sort by name?
  }

  const queryParams = new URLSearchParams(options).toString()

  try {
    const data = await fetch(`${EP_UNIVERSIDADES}?${queryParams}`)
      .then(res => res.json())
      .then(d => d.data || [])
    // TODO: if data.length == 0, stop infiniteScroll requests
    return data
  } catch (error) {
    return []
  }
}

export async function getTopUnivesities(): Promise<University[]> {
  // TODO: consumir EP de universidades más populares.
  // por el momento se utilizan las primeras de la lista.
  return await getUnivesitiesByPage(0)
}

export async function getUnivesityProps(slugUniversidad: string) {
  try {
    return await fetch(`${EP_UNIVERSIDADES}/${slugUniversidad}`).then(res => res.json())
  } catch (error) {
    console.error('Problema al obtener props de universidad: ' + slugUniversidad, error)
    return null
  }
}
