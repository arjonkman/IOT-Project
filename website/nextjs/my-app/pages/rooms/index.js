import { Row, Col } from 'react-bootstrap'
import Head from 'next/Head'

import Room from '../../components/Room'
import RoomSearch from '../../components/RoomSearch'

export default function Rooms(props) {
  return (
    <>
      <Head>
        <title>Ettudo - Rooms</title>
      </Head>
      <Row className='pt-3 px-3'>
        <Col sm={6} className='pb-3'>
          <RoomSearch />
        </Col>
        <Col sm={6}>
          <Row className="mx-0 justify-content-center text-center">
            <Room title='Room 1' description='Room 1 light' />
            <Room title='Room 2' description='Room 1 light' />
            <Room title='Room 3' description='Room 1 light' />
            <Room title='Room 4' description='Room 1 light' />
            <Room title='Room 5' description='Room 1 light' />
            <Room title='Room 6' description='Room 1 light' />
          </Row>
        </Col>
      </Row>
    </>
  )
}