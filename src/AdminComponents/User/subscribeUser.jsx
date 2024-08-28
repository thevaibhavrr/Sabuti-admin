
import React, { useEffect, useState } from 'react'
import { makeApi } from '../../api/callApi'
import "../../adminCss/User/allUser.css"

function SubscribeUser() {
  // difine state
  const [User, setUsers] = useState([])
  console.log(User)
  // get all users
  const getAllUser = async () => {
    try {
      const response = await makeApi("/api/get-all-subscribe", "GET")
      setUsers(response.data.subscribe)
    } catch (error) {
      console.log(error)
    }
  }

  // call function
  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {User && User.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.email}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </>
  )
}

export default SubscribeUser
