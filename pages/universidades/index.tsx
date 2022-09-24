import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getUnivesitiesByPage } from '../../common'
import ListadoUniversidades from '../../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../../components/universidades/TituloUniversidades'
import { University } from '../../types'

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
