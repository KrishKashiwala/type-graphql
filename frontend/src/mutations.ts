import { gql } from '@apollo/client';
const ADD_USER = gql`
    mutation createUser($name: string, $type: string) {
        createUser(name: $name, type: $type) {
            name
            type
        }
    }
`;
export { ADD_USER };
