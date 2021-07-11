import { postsAdapter } from "./";

const postsSelectors = postsAdapter.getSelectors((state) => state.posts);

export default postsSelectors;
