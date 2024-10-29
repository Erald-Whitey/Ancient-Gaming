import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PostState} from '../../store/post.reducer';
import {selectAllPosts, selectPostError} from '../../store/post.selectors';
import {loadPosts} from '../../store/post.actions';
import {AsyncPipe} from '@angular/common';
import {PostsTableComponent} from './components/posts-table.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  template: `
    <button
      [routerLink]="['/posts/create']"
      class="m-4 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
    >
      Create
    </button>
    @let posts = posts$ | async;
    @if(posts) {
      <app-posts-table [data]="posts"></app-posts-table>
    }
  `,
  imports: [
    AsyncPipe,
    PostsTableComponent,
    RouterLink
  ],
  standalone: true
})

export default class PostListComponent implements OnInit {

  private store = inject(Store<{ posts: PostState }>);
  posts$ = this.store.select(selectAllPosts);
  error$ = this.store.select(selectPostError);

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }
}
