import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { getData } from '../LocalRequest/getUsers'
import Paginate from './Paginate/Paginate'
import UsersTable from './UsersTable/UsersTable'

const TableUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [userPerPage, setUserPerPage] = useState(10)

    useEffect(()=>{
        setLoading(true)
        getData().then(data => {
            setUsers(data.usersData)
        })
        setLoading(false)
    },[])

    const lastUser = currentPage * userPerPage
    const firstUser = lastUser - userPerPage
    const currentUsers = users.slice(firstUser, lastUser)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const quantyUsers = (number) => setUserPerPage(number)

    return (
        <div>
            <Row className='text-align-center'>
                <Col md={3}>
                    <h2>Data Users</h2>
                </Col>
            </Row>
            <UsersTable 
                dataPost={currentUsers}
                loading={loading}
                quantyUsers={quantyUsers}
            />
            <Paginate 
                userPerPage={userPerPage}
                totalUsers={users.length}
                pagination={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

export default TableUsers
