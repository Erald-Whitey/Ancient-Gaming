import {inject, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {gql} from '@apollo/client/core';
import {Post} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apollo = inject(Apollo)


  getAll(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          posts {
            data {
              id
              title
              body
            }
          }
        }
      `
    });
  }

  getOne(id: number): Observable<any> {
    return this.apollo.query<Post>({
      query: gql`
        query ($id: ID!) {
          post(id: $id) {
            id
            title
            body
          }
        }
      `,
      variables: { id }
    });
  }
}
