import {Component, effect, inject, input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PostState} from '../../store/post.reducer';
import {selectPostById} from '../../store/post.selectors';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Post} from '../../models/post.model';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'post-view-component',
  template: `
    @let post = post$ | async ;
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <article class="w-1/3 rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 shadow-lg">
        <div>
          <h3 class="mt-4 text-lg font-medium sm:text-xl">
            {{ post?.title }}
          </h3>

          <p class="mt-1 text-sm text-gray-700">
            {{ post?.body }}
          </p>
        </div>
        <div class="w-28 mt-4">
          <button
            (click)="goBack()"
            class="w-full rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
            Go Back
          </button>
        </div>
      </article>
    </div>
  `,
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  standalone: true
})

export default class PostViewComponent {
  id = input();
  private store = inject(Store<{ posts: PostState }>);
  router = inject(Router)
  post$: Observable<Post | null> = of(null)
  goBack() {
    this.router.navigate(['/posts']);
  }
  constructor() {
    effect(() => {
      if(this.id()) {
        this.post$ = this.store.select(selectPostById(Number(this.id())));
      }
    });
  }
}
