import {Component, input, OnInit} from '@angular/core';
import {Post} from '../../../models/post.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-posts-table',
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="w-1/12 px-4 py-2 font-medium text-gray-900">Id</th>
          <th class="w-1/4 px-4 py-2 font-medium text-gray-900">Title</th>
          <th class="w-1/2 px-4 py-2 font-medium text-gray-900">Body</th>
          <th class="w-1/12 px-4 py-2 font-medium text-gray-900">Action</th>
        </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          @for (el of data(); track $index) {
            <tr>
              <td class=" w-1/12 px-4 py-2 font-medium text-gray-900">{{ el.id }}</td>
              <td class=" w-1/4 px-4 py-2 text-gray-700">{{ el.title }}</td>
              <td class=" w-1/2 px-4 py-2 text-gray-700">{{ el.body }}</td>
              <td class="flex items-center justify-center w-1/12 px-4 py-2">
                <a
                  [routerLink]="['/posts/view', el.id]"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  imports: [
    RouterLink
  ],
  standalone: true
})

export class PostsTableComponent {
  data = input.required<Post[]>();
}
