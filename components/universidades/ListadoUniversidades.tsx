// import PropTypes from "prop-types";
import { University } from '../../types'
import ElementoUniversidad from './ElementoUniversidad'

type Props = {
  lista?: University[]
}

function ListadoUniversidades({ lista = [] }: Props) {
  return (
    <>
      {lista.map((universidad: University) => (
        <ElementoUniversidad key={universidad.id} item={universidad}></ElementoUniversidad>
      ))}
    </>
  )
}

export default ListadoUniversidades
