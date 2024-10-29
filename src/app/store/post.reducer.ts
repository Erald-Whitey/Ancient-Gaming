import {Action, createReducer, on} from '@ngrx/store';
import {loadPostsSuccess, addPost} from './post.actions';
import {Post} from '../models/post.model';

export interface PostState {
  posts: Post[];
  error: any;
}

export const initialState: PostState = {
  posts: [],
  error: null
};

const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(addPost, (state, { post }) => {
    // Find the maximum ID in the existing posts
    const maxId = state.posts.reduce((max, p) => Math.max(max, p.id), 0);

    // Create a new post with the incremented ID
    const newPost = { ...post, id: maxId + 1 } as Post;

    // Add the new post to the posts array
    return { ...state, posts: [...state.posts, newPost] };
  }),
);

export function reducer(state: PostState | undefined, action: Action) {
  return postReducer(state, action);
}
