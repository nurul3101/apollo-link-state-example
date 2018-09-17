import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import Counter, { client } from './counter'

import './styles.css'

function App() {
  return (
    <ApolloProvider client={client}>
      <Counter />
    </ApolloProvider>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)
