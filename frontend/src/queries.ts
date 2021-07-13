import { gql } from '@apollo/client';
const GET_ALL_USERS = gql`
    query allUsers {
        allUsers {
            name
            type
        }
    }
`;
export { GET_ALL_USERS };
