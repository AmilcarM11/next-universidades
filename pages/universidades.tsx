import { University } from '../types'
import ListadoUniversidades from '../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../components/universidades/TituloUniversidades'
import { GetServerSideProps } from 'next'

type Props = {
  listadoUniversidades: University[]
}

export default function Universidades({ listadoUniversidades }: Props) {
  return (
    <>
      <TituloUniversidades />
      <ListadoUniversidades lista={listadoUniversidades} />
    </>
  )
}

// issue #1: SSR listado de universidades, según propiedades del request
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await getUnivesitiesByPage(0)
  return { props: { listadoUniversidades: data.data } }
}

async function getUnivesitiesByPage(page: number) {
  // TODO: pagination
  return await fetch(`https://api.wuolah.com/v2/universities`).then(res => res.json())
  // TODO: try-catch
}
