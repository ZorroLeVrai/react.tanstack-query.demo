import React from 'react'
import UserEditor from './UserEditor';

const EditUser = () => {
  return (
    <UserEditor mode="edit" title="Edit User" activeFields={["id", "name", "age"]} />
  )
}

export default EditUser;