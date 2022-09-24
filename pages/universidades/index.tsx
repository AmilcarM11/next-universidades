import { useQuery, useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query'
import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getUnivesitiesByPage } from '../../common'
import ListadoUniversidades from '../../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../../components/universidades/TituloUniversidades'
import { University } from '../../types'

type Props = {
  listadoUniversidades: University[]
}

function Universidades({ listadoUniversidades }: Props) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, // TODO: mostrar loading.
    data,
  } = useInfiniteQuery(['universidades'], getUniversities, {
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    initialData: { pages: [{ response: listadoUniversidades, nextPage: 1 }], pageParams: [0] },
  })

  const lista: University[] = []
  data?.pages.forEach(page =>
    page.response.forEach(universidad => {
      lista.push(universidad)
    }),
  )

  // TODO: cargar más universidades según el scroll del navegador
  // he usado el botón como prueba de concepto.

  return (
    <Flex direction="column" alignItems="center" p={4}>
      <Box p={8} borderWidth="1px" borderRadius="lg" w="lg">
        <TituloUniversidades />
        <ListadoUniversidades lista={lista} />
      </Box>

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </Flex>
  )
}

export default Universidades

async function getUniversities({ pageParam = 0 }: QueryFunctionContext) {
  const { data, nextPage } = await getUnivesitiesByPage(pageParam)
  return { response: data, nextPage }
}

// issue #1: SSR listado de universidades, según propiedades del request
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await getUnivesitiesByPage(0)
  return { props: { listadoUniversidades: data } }
}
