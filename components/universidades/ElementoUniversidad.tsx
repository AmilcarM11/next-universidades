import Link from 'next/link'
import { University } from '../../types'

type Props = {
  item: University
}

// TODO: Componentes visuales

function ElementoUniversidad({ item }: Props) {
  return (
    <li>
      <Link href={`/universidades/${item.slug}`}>{item.name}</Link>
    </li>
  )
}

export default ElementoUniversidad
