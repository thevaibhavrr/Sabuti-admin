import React, { useEffect, useState } from 'react'
import { makeApi } from '../../api/callApi'
import "../../adminCss/User/allUser.css"

function AllUser() {
    // difine state
    const [User, setUsers] = useState([])
    // get all users
    const getAllUser = async () => {
        try {
            const response = await makeApi("/api/get-all-users", "GET")
            setUsers(response.data.users)
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
                        <th scope="col">profile</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {User && User.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <img loading="lazy" src={user.userImage} classNameName='admin_all_user_image' style={{  maxWidth: "70px", maxHeight: "70px" }} /> </td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobileNumber}</td>
                            <td>{user.country}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </>
    )
}

export default AllUser
