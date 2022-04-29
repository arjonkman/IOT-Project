import { Row } from 'react-bootstrap'
import Head from 'next/Head'

import Room from '../../components/Room'

export default function Rooms(props) {
  return (
    <>
      <Head>
        <title>Ettudo - Rooms</title>
      </Head>
      <Row className="mx-0 p-4 justify-content-center text-center">
        <Room title='Room 1' description='Room 1 light' />
        <Room title='Room 2' description='Room 1 light' />
        <Room title='Room 3' description='Room 1 light' />
        <Room title='Room 4' description='Room 1 light' />
        <Room title='Room 5' description='Room 1 light' />
        <Room title='Room 6' description='Room 1 light' />
      </Row>
    </>
  )
}