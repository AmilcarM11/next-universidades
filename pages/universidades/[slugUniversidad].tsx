import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { LoremIpsum } from 'react-lorem-ipsum'
import { getTopUnivesities, getUnivesityProps } from '../../common'
import { University } from '../../types'

type Props = {
  data: University
}

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

      <Container
        maxW="container.lg"
        bg="blue.50"
        width="auto"
        my={8}
        mx={[2, 4, 8, 'auto']}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <header>
          {/* Breadcrumbs: Volver al listado de Universidades */}
          <Breadcrumb>
            <BreadcrumbItem>
              <NextLink href="/universidades" passHref>
                <div>
                  <ArrowBackIcon mr={2}></ArrowBackIcon>
                  <BreadcrumbLink>Universidades</BreadcrumbLink>
                </div>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Text>{data.name}</Text>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Encabezado: nombre de la universidad */}
          <Flex alignItems="center" gap={8} mt={2}>
            <Img
              src={data.logoUrl}
              alt={data.shortName}
              boxSize={['4em', '6em', '8em']}
              objectFit="contain"
            />
            <Flex direction="column">
              <Heading size={['md', 'lg', 'xl']}> {data.name}</Heading>

              <div>
                <Badge size="lg">{data.shortName}</Badge>
              </div>
            </Flex>
          </Flex>
        </header>

        <Divider my={4} />

        {/* Body */}
        <section>
          <Heading size={['sm', 'md', 'lg']} mb={4}>
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

  return {
    props: { data },
    // Revalidar props cada 10 mins, por si cambia la información en la API.
    revalidate: 10 * 60,
  }
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

export default PaginaUniversidad
