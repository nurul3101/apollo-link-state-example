import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { COUNTER_QUERY } from './queries'
import { compose, graphql, Query, Mutation, withApollo } from 'react-apollo'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    counter: {
      __typename: 'Counter',
      value: 1
    }
  }
})

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, new HttpLink()])
})

class Increment extends Component {
  IncrementValue = (cache, queryData) => {
    const currentValue = queryData.counter.value
    console.log(currentValue)
    const data = {
      counter: {
        __typename: 'Counter',
        value: currentValue + 1
      }
    }

    cache.writeData({ data })
  }

  render() {
    return (
      <Query query={COUNTER_QUERY}>
        {({ client, data }) => (
          <button onClick={() => this.IncrementValue(client, data)}>
            Increment
          </button>
        )}
      </Query>
    )
  }
}

class Counter extends Component {
  getCounterValue = () => {
    return (
      <Query query={COUNTER_QUERY}>
        {({ data }) => (
          <div>
            <div>{data.counter.value}</div>
          </div>
        )}
      </Query>
    )
  }

  render() {
    const { getCounter } = this.props
    {
      console.log(getCounter)
    }
    return (
      <div className="App">
        <h3>
          Counter Value:
          {getCounter.counter.value}
          {/* {this.getCounterValue()} */}
        </h3>
        <Increment />
      </div>
    )
  }
}

export default compose(
  graphql(COUNTER_QUERY, {
    name: 'getCounter'
  }),
  withApollo
)(Counter)
