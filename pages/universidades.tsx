import { University } from '../types'
import ListadoUniversidades from '../components/universidades/ListadoUniversidades'
import TituloUniversidades from '../components/universidades/TituloUniversidades'

// TODO: Data fetch: API
const listadoUniversidades: University[] = [
  {
    id: 1,
    slug: 'ie-universidad',
    name: 'IE Universidad',
    shortName: 'IE',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/1/ie-universidad-logo.jpg',
  },
  {
    id: 2,
    slug: 'mondragon-unibertsitatea',
    name: 'Mondragón Unibertsitatea',
    shortName: 'MU',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/2/mondragon-unibertsitatea-logo.jpg',
  },
  {
    id: 3,
    slug: 'otros-centros-de-nivel-universitario',
    name: 'Otros Centros de Nivel Universitario',
    shortName: 'OCNU',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/3/otros-centros-de-nivel-universitario-logo.jpg',
  },
  {
    id: 4,
    slug: 'universidad-a-distancia-de-madrid',
    name: 'Universidad a Distancia de Madrid',
    shortName: 'UDIMA',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/4/universidad-a-distancia-de-madrid-logo.jpg',
  },
  {
    id: 5,
    slug: 'universidad-alfonso-x-el-sabio',
    name: 'Universidad Alfonso X El Sabio',
    shortName: 'UAX',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/5/universidad-alfonso-x-el-sabio-logo.jpg',
  },
  {
    id: 6,
    slug: 'universidad-antonio-de-nebrija',
    name: 'Universidad Antonio de Nebrija',
    shortName: 'UAN',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/6/universidad-antonio-de-nebrija-logo.jpg',
  },
  {
    id: 7,
    slug: 'universidad-autonoma-de-barcelona',
    name: 'Universidad Autónoma de Barcelona',
    shortName: 'UAB',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/7/universidad-autonoma-de-barcelona-logo.jpg',
  },
  {
    id: 8,
    slug: 'universidad-autonoma-de-madrid',
    name: 'Universidad Autónoma de Madrid',
    shortName: 'UAM',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/8/universidad-autonoma-de-madrid-logo.jpg',
  },
  {
    id: 9,
    slug: 'universidad-camilo-jose-cela',
    name: 'Universidad Camilo José Cela',
    shortName: 'UCJC',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/9/universidad-camilo-jose-cela-logo.jpg',
  },
  {
    id: 10,
    slug: 'universidad-cardenal-herrera-ceu',
    name: 'Universidad CEU Cardenal Herrera',
    shortName: 'UCHCEU',
    logoUrl:
      'https://s3-eu-west-1.amazonaws.com/wuolah-public/imagenes/universidades/10/universidad-cardenal-herrera-ceu-logo.jpg',
  },
]

export default function Universidades() {
  return (
    <>
      <TituloUniversidades />
      <ListadoUniversidades lista={listadoUniversidades} />
    </>
  )
}
