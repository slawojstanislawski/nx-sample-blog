import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/angular';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {PostsService} from '../services/posts.service';
import {POSTS_FEATURE_KEY} from './posts.reducer';
import * as PostsActions from './posts.actions';
import * as fromPosts from './posts.reducer';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.dataPersistence.fetch(PostsActions.loadPosts, {
      run: (
        action: ReturnType<typeof PostsActions.loadPosts>,
        state: fromPosts.PostsPartialState
      ) => {
        return this.postsService
          .findAll()
          .pipe(map(posts => PostsActions.loadPostsSuccess({posts})));
      },

      onError: (action: ReturnType<typeof PostsActions.loadPosts>, error) =>
        PostsActions.loadPostsFailure({error})
    })
  );

  loadPost$ = createEffect(() =>
    this.dataPersistence.fetch(PostsActions.loadPost, {
      run: (
        action: ReturnType<typeof PostsActions.loadPost>,
        state: fromPosts.PostsPartialState
      ) => {
        const {id} = action;
        const post = state[POSTS_FEATURE_KEY].entities[id];
        if (post) {
          return PostsActions.loadPostSuccess({post});
        } else {
          return this.postsService
            .findOneById(action.id)
            .pipe(map(post => PostsActions.loadPostSuccess({post})));
        }
      },

      onError: (action: ReturnType<typeof PostsActions.loadPost>, {error}) =>
        PostsActions.loadPostFailure({error})
    })
  );

  createPost$ = createEffect(() =>
    this.dataPersistence.fetch(PostsActions.createPost, {
      run: (
        action: ReturnType<typeof PostsActions.createPost>,
        state: fromPosts.PostsPartialState
      ) => {
        return this.postsService
          .createPost(action.post)
          .pipe(map(post => PostsActions.createPostSuccess({post})));
      },

      onError: (action: ReturnType<typeof PostsActions.createPost>, error) => {
        console.error('Error', error);
        return PostsActions.createPostFailure({error});
      }
    })
  );

  createPostSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(PostsActions.createPostSuccess)),
    {dispatch: false}
  );

  updatePost$ = createEffect(() =>
    this.dataPersistence.fetch(PostsActions.updatePost, {
      run: (
        action: ReturnType<typeof PostsActions.updatePost>,
        state: fromPosts.PostsPartialState
      ) => {
        console.log('before sending the request');
        return this.postsService
          .updatePost(action.update)
          .pipe(map(post => PostsActions.updatePostSuccess({post})));
      },

      onError: (action: ReturnType<typeof PostsActions.updatePost>, error) =>
        PostsActions.updatePostFailure({error})
    })
  );

  updatePostSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(PostsActions.updatePostSuccess)),
    {dispatch: false}
  );

  deletePost$ = createEffect(() =>
    this.dataPersistence.fetch(PostsActions.deletePost, {
      run: (
        action: ReturnType<typeof PostsActions.deletePost>,
        state: fromPosts.PostsPartialState
      ) => {
        const id = action.id;
        return this.postsService
          .deletePost(id)
          .pipe(map(deletionResult => PostsActions.deletePostSuccess({id})));
      },

      onError: (action: ReturnType<typeof PostsActions.deletePost>, error) =>
        PostsActions.deletePostFailure({error})
    })
  );

  deletePostSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(PostsActions.deletePostSuccess)),
    {dispatch: false}
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<
      fromPosts.PostsPartialState
    >,
    private readonly postsService: PostsService
  ) {}
}
