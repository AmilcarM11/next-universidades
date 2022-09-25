import { Badge, Box, Flex, Img, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { University } from '../../types'

type Props = {
  item: University
}

function ElementoUniversidad({ item }: Props) {
  return (
    <Box
      w={['22em', '30em', '36em']}
      borderWidth="1px"
      borderRadius="md"
      my={3}
      p={2}
      backgroundColor="blue.50"
      boxShadow="sm"
      _hover={{
        fontWeight: 'semibold',
        background: 'blue.100',
        cursor: 'pointer',
      }}
    >
      <NextLink href={`/universidades/${item.slug}`} passHref>
        <Flex alignItems="center" gap={6}>
          <Img
            src={item.logoUrl}
            alt={item.shortName}
            boxSize={['4em', '5em', '6em']}
            objectFit="contain"
          />
          <Stack direction="column">
            <Link>
              <Text fontSize={['md', 'lg', 'xl']}> {item.name}</Text>
            </Link>
            <Box>
              <Badge>{item.shortName}</Badge>
            </Box>
          </Stack>
        </Flex>
      </NextLink>
    </Box>
  )
}

export default ElementoUniversidad
