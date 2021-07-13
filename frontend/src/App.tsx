import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from './queries';
import { ADD_USER } from './mutations';
interface User {
    name: String;
    type: String;
}
interface allUsers {
    allUsers: User[];
}

const App = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const { loading, error, data } = useQuery<allUsers>(GET_ALL_USERS);
    const [createUser] = useMutation<User>(ADD_USER);
    if (error) return <h1>oopsie.. error :</h1>;
    if (loading || !data) return <h1>...loading</h1>;
    console.log(data);

    // handle mutation data
    const addUser = async () => {
        createUser({
            variables: {
                name: name,
                type: type
            }
        });
    };

    return (
        <div>
            {/* {data.allUsers.map((singleUser: User) => (
                <div>
                    <h1>{singleUser.name}</h1>
                    <h1>{singleUser.type}</h1>
                </div>
            ))} */}
            <div>
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setType(e.target.value)
                    }
                />
                <button onClick={() => addUser}>Submit</button>
            </div>
        </div>
    );
};

export default App;
