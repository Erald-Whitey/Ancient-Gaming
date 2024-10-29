import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import {reducer} from './store/post.reducer';
import {provideEffects} from '@ngrx/effects';
import {PostEffects} from './store/post.effects';
import {graphqlProvider} from './providers/graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }),
    provideRouter(routes,  withComponentInputBinding()),
    provideStore({
      posts: reducer
    }),
    provideEffects(PostEffects),
    provideHttpClient(),
    graphqlProvider
  ]
};
