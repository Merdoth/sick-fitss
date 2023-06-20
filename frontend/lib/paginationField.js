import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items in the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first - 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing?.slice(skip, skip + first).filter((x) => x);
      // if
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN just SEND IT

      if (items?.length && items?.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // if there are items, just return them from the cache, and we don't need to go to the network
      if (items?.length) {
        // console.log(
        //   `There are ${items?.length} items in the cache! Gonna send them to apollo`
        // );
        return items;
      }

      return false; // fallback to network

      // first thing it does is ask the read function for those items.
      // we can either do one of two things
      // first thing we can do is return one or two items because there are already in the cache
      // the other thing we can do is to return false from here, that will make a network request
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo client comes back from the network with our products
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      // Finally we return the merged items from the cache.
      return merged;
    },
  };
}
