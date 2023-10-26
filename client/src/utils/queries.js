import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    getUser {
      _id
      email
      products {
        _id
        name
        price
        quantity
        color
        size
      }
    }
  }
`;