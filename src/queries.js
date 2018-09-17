import gql from 'graphql-tag'

export const COUNTER_QUERY = gql`
{
  counter @client {
    value
  }
}
`
