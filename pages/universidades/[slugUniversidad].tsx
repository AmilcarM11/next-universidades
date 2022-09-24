import { ArrowBackIcon } from '@chakra-ui/icons'
import { Badge, Container, Divider, Flex, Heading, HStack, Img, Link } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { LoremIpsum } from 'react-lorem-ipsum'
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

      <Container maxW="container.lg" bg="gray.50" my={8} p={8} borderWidth="1px" borderRadius="lg">
        <header>
          {/* Volver al listado de Universidades */}
          <NextLink href="/universidades" passHref>
            {/* <LinkOverlay> */}
            <HStack>
              <ArrowBackIcon></ArrowBackIcon>
              <Link>Volver</Link>
            </HStack>
            {/* </LinkOverlay> */}
          </NextLink>

          {/* Encabezado: nombre de la universidad */}
          <Flex alignItems="center" gap={8} mt={2}>
            <Img src={data.logoUrl} alt={data.shortName} boxSize="120px" objectFit="contain" />
            <Flex direction="column">
              <Heading size="xl"> {data.name}</Heading>

              <div>
                <Badge size="lg">{data.shortName}</Badge>
              </div>
            </Flex>
          </Flex>
        </header>

        <Divider my={4} />

        {/* Body */}
        <section>
          <Heading size="lg" mb={4}>
            Historia
          </Heading>
          <LoremIpsum p={4} random={false} />
        </section>
      </Container>
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
