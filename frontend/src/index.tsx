import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    from,
    HttpLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import reportWebVitals from './reportWebVitals';

// error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, path, locations }) =>
            alert(
                `Graphql errors ${message}, location is ${locations} and path is ${path}`
            )
        );
    }
});

//link kind of middleware
const link = from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:4000/graphql' })
]);

// main interaction with graphqlServer
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
