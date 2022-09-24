import { Badge, Box, Flex, Img, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { University } from '../../types'

type Props = {
  item: University
}

function ElementoUniversidad({ item }: Props) {
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="md"
      my={3}
      p={2}
      _hover={{
        fontWeight: 'semibold',
        background: '#eeeeee',
        cursor: 'pointer',
      }}
    >
      <NextLink href={`/universidades/${item.slug}`} passHref>
        <Flex alignItems="center" gap={6}>
          <Img src={item.logoUrl} alt={item.shortName} boxSize="60px" objectFit="contain" />
          <Stack direction="column">
            <Link>
              <Text fontSize="lg"> {item.name}</Text>
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
