export function fetchPostsIfNeeded(reddit) {




  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.


// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit));
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)));
//   };
// }



//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       // Dispatch a thunk from thunk!
//       return dispatch(fetchPosts(reddit));
//     } else {
//       // Let the calling code know there's nothing to wait for.
//       return Promise.resolve();
//     }
//   };
// }