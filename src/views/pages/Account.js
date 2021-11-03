import React, { Component } from 'react';
import UsersDataTable from './UsersDataTable/UsersDataTable';
import UserForm from './UserForm/UserForm';

class Account extends Component {
  

  render() {
    return (
      <div>
        <UserForm />
        <UsersDataTable />
      </div>
    );
  }
}

export default Account;