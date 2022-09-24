import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { University } from '../../types'

type Props = {
  data: University
}

// TODO: crear componente visualmente agradable.

function PaginaUniversidad({ data }: Props) {
  if (!data) return <h1>No data found</h1>

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} key="title" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:image" content={data.logoUrl} key="image" />
        <meta
          property="og:description"
          content={`Página de la universidad: ` + data.name}
          key="description"
        />
      </Head>

      <Link href="/universidades">Go Back</Link>

      <h3>{data.name}</h3>
      <h4>{data.shortName}</h4>
    </>
  )
}

// issue #1: SSG universidades top 20% más populares; SSR las demás (via fallback)
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getUnivesityProps(params?.slugUniversidad as string)

  return { props: { data } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const topUnivesities = await getTopUnivesities()
  const paths = topUnivesities.map(u => ({ params: { slugUniversidad: u.slug } }))

  return {
    paths,
    // Creo que blocking es mejor para SEO, pero hay que confirmarlo
    fallback: true,
  }
}

async function getTopUnivesities(): Promise<University[]> {
  // TODO: consumir EP de universidades más populares.
  // por el momento se utilizan las primeras de la lista.
  try {
    return await fetch(`https://api.wuolah.com/v2/universities`)
      .then(res => res.json())
      .then(data => data.data)
  } catch (error) {
    console.error('Problema al obtener universidades populares.', error)
    return []
  }
}

async function getUnivesityProps(slug: string) {
  try {
    return await fetch(`https://api.wuolah.com/v2/universities/${slug}`).then(res => res.json())
  } catch (error) {
    console.error('Problema al obtener props de universidad: ' + slug, error)
    return null
  }
}

export default PaginaUniversidad
