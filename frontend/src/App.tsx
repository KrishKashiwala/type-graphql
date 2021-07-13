import React from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './queries';
interface User {
    name: String;
    type: String;
}
interface allUsers {
    allUsers: User[];
}

const App = () => {
    const { loading, error, data } = useQuery<allUsers>(GET_ALL_USERS);
    if (error) return <h1>oopsie.. error :</h1>;
    if (loading || !data) return <h1>...loading</h1>;
    console.log(data);
    return (
        <div>
            {data.allUsers.map((singleUser: User) => (
                <div>
                    <h1>{singleUser.name}</h1>
                    <h1>{singleUser.type}</h1>
                </div>
            ))}
        </div>
    );
};

export default App;
