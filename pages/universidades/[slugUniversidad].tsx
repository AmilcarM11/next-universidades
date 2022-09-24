import Link from 'next/link'
import Head from 'next/head'

// TODO: fetch data from API
const defaultProps = {
  id: 2,
  slug: 'mondragon-unibertsitatea',
  name: 'Mondragón Unibertsitatea',
  shortName: 'MU',
  logoUrl:
    'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/2/mondragon-unibertsitatea-logo.jpg',
}

const data = { ...defaultProps }

function PaginaUniversidad() {
  return (
    <>
      <Link href="/universidades">Go Back</Link>

      <h3>{data.name}</h3>
    </>
  )
}

export default PaginaUniversidad
