import { University } from '../../types'

type Props = {
  item: University
}

// TODO: Componentes visuales

function ElementoUniversidad({ item }: Props) {
  return (
    <li>
      <a href={`/universidades/${item.slug}`}>{item.name}</a>
    </li>
  )
}

export default ElementoUniversidad
