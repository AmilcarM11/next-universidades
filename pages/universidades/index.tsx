import { Box, Flex, Radio, RadioGroup, Spinner, Stack, Text } from '@chakra-ui/react'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { getUnivesitiesByPage } from '../../common'
import ListadoUniversidades from '../../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../../components/universidades/TituloUniversidades'
import { University } from '../../types'

type Props = {
  listadoUniversidades: University[]
}

function Universidades({ listadoUniversidades }: Props) {
  // Ordenar universidades por id o por nombre
  const [sortBy, setSortBy] = useState('id')

  // Configurar infiniteQuery
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useInfiniteQuery(
    ['universidades', sortBy],
    pageParams => getUniversities(pageParams, sortBy),
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
        <RadioGroup value={sortBy} name="sortBy" onChange={setSortBy}>
          <Stack spacing={5} direction="row">
            <Text>Ordenar por</Text>
            <Radio value="name">Nombre</Radio>
            <Radio value="id">Id</Radio>
          </Stack>
        </RadioGroup>
        <ListadoUniversidades lista={lista} />
      </Box>

      {isFetchingNextPage && <Spinner />}
    </Flex>
  )
}

export default Universidades

async function getUniversities({ pageParam }: QueryFunctionContext, sortBy: string) {
  const { data, nextPage } = await getUnivesitiesByPage(pageParam, sortBy)
  return { response: data, nextPage }
}

// issue #1: SSR listado de universidades, según propiedades del request
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await getUnivesitiesByPage(0)
  return { props: { listadoUniversidades: data } }
}
