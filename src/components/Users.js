import React, { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    // <ul>
                    //     {users.map((user, i) => <li key={i}>{user?.fullName}   
                    //     {user?.roles.map((role, j) => <span key={j}>{role?.name}</span>)}</li>)}
                    // </ul>
                    <table>
                        <tbody>
                            {users.map((user, i) => 
                            <tr key={i}>
                                <td>{user?.fullName}</td>
                                {user?.roles.map((role, j) => <td key={j}>{role?.name}</td>)}
                            </tr>)}
                        </tbody>
                    </table>
                ) : <p>No users to display</p>
            }
            <button onClick={() => refresh()}>Refresh</button>
            <br/>
        </article>
    )
}

export default Users