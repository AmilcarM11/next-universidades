import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import ListadoUniversidades from '../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../components/universidades/TituloUniversidades'
import { University } from '../types'

type Props = {
  listadoUniversidades: University[]
}

export default function Universidades({ listadoUniversidades }: Props) {
  return (
    <Flex direction="column" alignItems="center" p={4}>
      <Box p={8} borderWidth="1px" borderRadius="lg" w="lg">
        <TituloUniversidades />
        <ListadoUniversidades lista={listadoUniversidades} />
      </Box>
    </Flex>
  )
}

// issue #1: SSR listado de universidades, según propiedades del request
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await getUnivesitiesByPage(0)
  return { props: { listadoUniversidades: data } }
}

async function getUnivesitiesByPage(page: number): Promise<University[]> {
  const options = {
    'pagination[pageSize]': '20',
    'pagination[page]': String(page),
    sort: 'id', // TODO: sort by name?
  }

  const queryParams = new URLSearchParams(options).toString()

  try {
    const data = await fetch(`https://api.wuolah.com/v2/universities?${queryParams}`)
      .then(res => res.json())
      .then(d => d.data || [])
    // TODO: if data.length == 0, stop infiniteScroll requests
    return data
  } catch (error) {
    return []
  }
}
