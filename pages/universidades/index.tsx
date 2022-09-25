import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getUnivesitiesByPage } from '../../common'
import ListadoUniversidades from '../../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../../components/universidades/TituloUniversidades'
import { University } from '../../types'
import { useEffect } from 'react'

type Props = {
  listadoUniversidades: University[]
}

function Universidades({ listadoUniversidades }: Props) {
  // Configurar infiniteQuery
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useInfiniteQuery(
    ['universidades'],
    getUniversities,
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
      initialData: { pages: [{ response: listadoUniversidades, nextPage: 1 }], pageParams: [0] },
    },
  )

  const lista: University[] = []
  data?.pages.forEach(page =>
    page.response.forEach(universidad => {
      lista.push(universidad)
    }),
  )

  // Cargar más universidades según el scroll del navegador
  useEffect(() => {
    let fetching = false
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement
      // Cuando baje la barra de scroll, cargar la próxima página
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true
        if (hasNextPage) await fetchNextPage()
        fetching = false
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex direction="column" alignItems="center" p={4}>
      <Box p={8} borderWidth="1px" borderRadius="lg" w="lg">
        <TituloUniversidades />
        <ListadoUniversidades lista={lista} />
      </Box>

      {isFetchingNextPage && <Spinner />}
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
