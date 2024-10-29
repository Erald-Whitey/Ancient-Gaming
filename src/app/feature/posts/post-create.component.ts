import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {addPost} from '../../store/post.actions';
import {Store} from '@ngrx/store';
import {PostState} from '../../store/post.reducer';
import {Router} from '@angular/router';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-post-create',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <form [formGroup]="form" class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div>
          <label for="title" class="block text-xs font-medium text-gray-950"> Title </label>
          <input
            formControlName="title"
            type="text"
            id="title"
            placeholder="Title"
            class="mt-1 h-8 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

        <div class="mt-4">
          <label for="body" class="block text-xs font-medium text-gray-950"> Body </label>
          <textarea
            formControlName="body"
            id="body"
            rows="4"
            class="mt-2 w-full rounded-lg border border-gray-300 shadow-sm sm:text-sm"
            placeholder="Write something in body"
          ></textarea>
        </div>

        <div class="mt-4">
          <button
            (click)="create()"
            [disabled]="form.invalid"
            class="w-full rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
            Create
          </button>
        </div>
      </form>
    </div>
  `,
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})

export default class PostCreateComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<{ posts: PostState }>);
  private router = inject(Router);
  form = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  create() {
    this.store.dispatch(addPost({ post: this.form.value as Partial<Post> }));

    this.router.navigate(['/posts']);
  }
}
