import { useQuery, gql } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log(data, 'hehhehehehhe');
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
