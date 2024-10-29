import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

export const selectPostError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);

export const selectPostById = (id: number) =>
  createSelector(selectPostState, (postState: PostState) =>
    postState.posts.find(post => {
      return Number(post.id) === id;
    }) || null // Return the post or null if not found
  );
