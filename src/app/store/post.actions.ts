import { createAction, props } from '@ngrx/store';
import {Post} from '../models/post.model';

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());
export const addPost = createAction('[Post] Add Post', props<{ post: Partial<Post> }>());
