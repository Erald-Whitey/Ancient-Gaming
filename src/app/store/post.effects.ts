import {inject, Injectable} from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {of, withLatestFrom} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from './post.actions';
import {PostService} from '../services/post.service';
import {selectPostState} from './post.selectors';
import {Store} from '@ngrx/store';
import {PostState} from './post.reducer';

@Injectable()
export class PostEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);
  private store = inject(Store<{ posts: PostState }>);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(selectPostState)),
      mergeMap(([action, state]) => {
        // Check if there are posts already
        if (state.posts.length > 0) {
          return of(loadPostsSuccess({ posts: state.posts }));
        }

        return this.postService.getAll().pipe(
          map((response) => loadPostsSuccess({ posts: response.data.posts.data })),
          catchError((error) => of(loadPostsFailure({ error })))
        );
      })
    )
  );
}
