import React from 'react'
import { Row, Table } from 'reactstrap'

function UsersTable({dataPost}) {
    return (
        <Row>
            <Table dark>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataPost.map(user => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <th><img src={user.img} width='26px'/></th>
                                <th>{user.firstName}</th>
                                <th>{user.lastName}</th>
                                <th>{user.phoneNumber}</th>
                                <th>{user.email}</th>
                                <th>{user.roles}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Row>
    )
}

export default UsersTable
