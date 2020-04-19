import {Effect, Actions, ofType} from '@ngrx/effects';
import {HttpErrorResponse} from '@angular/common/http';
import {DataPersistence} from '@nrwl/angular';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {PostsPartialState} from './posts.reducer';
import {
  LoadPosts,
  LoadPostsSuccess,
  LoadPostsError,
  PostsActionTypes,
  CreatePost,
  CreatePostSuccess,
  CreatePostError,
  LoadPost,
  LoadPostSuccess,
  LoadPostError,
  DeletePost,
  DeletePostSuccess,
  DeletePostError,
  UpdatePost,
  UpdatePostSuccess,
  UpdatePostError,
} from './posts.actions';
import {PostsService} from '../services/posts.service';
import {IPost} from '@blog/shared/posts/data-access';

@Injectable()
export class PostsEffects {
  @Effect() loadPosts$ = this.dataPersistence.fetch(
    PostsActionTypes.LoadPosts,
    {
      run: (action: LoadPosts, state: PostsPartialState) => {
        return this.postsService
          .findAll()
          .pipe(map((results) => new LoadPostsSuccess(results)));
      },

      onError: (action: LoadPosts, error: HttpErrorResponse) => {
        return new LoadPostsError(error.error);
      },
    }
  );

  @Effect() loadPost$ = this.dataPersistence.fetch(PostsActionTypes.LoadPost, {
    run: (action: LoadPost, state: PostsPartialState) => {
      return this.postsService
        .findOneById(action.payload)
        .pipe(map((result) => new LoadPostSuccess(result)));
    },

    onError: (action: LoadPost, error: HttpErrorResponse) => {
      return new LoadPostError(error.error);
    },
  });

  @Effect() createPost$ = this.dataPersistence.pessimisticUpdate(
    PostsActionTypes.CreatePost,
    {
      run: (action: CreatePost, state: PostsPartialState) => {
        return this.postsService
          .createPost(action.payload)
          .pipe(map((results: IPost) => new CreatePostSuccess(results)));
      },

      onError: (action: CreatePost, error: HttpErrorResponse) => {
        return new CreatePostError(error.error);
      },
    }
  );

  @Effect({dispatch: false})
  created$ = this.actions$.pipe(ofType(PostsActionTypes.CreatePostSuccess));

  @Effect() updatePost$ = this.dataPersistence.pessimisticUpdate(
    PostsActionTypes.UpdatePost,
    {
      run: (action: UpdatePost, state: PostsPartialState) => {
        return this.postsService
          .updatePost(action.payload)
          .pipe(map((results: IPost) => new UpdatePostSuccess(results)));
      },

      onError: (action: UpdatePost, error: HttpErrorResponse) => {
        return new UpdatePostError(error.error);
      },
    }
  );

  @Effect({dispatch: false})
  updatePostSuccess$ = this.actions$.pipe(
    ofType(PostsActionTypes.UpdatePostSuccess)
  );

  @Effect() deletePost$ = this.dataPersistence.pessimisticUpdate(
    PostsActionTypes.DeletePost,
    {
      run: (action: DeletePost, state: PostsPartialState) => {
        return this.postsService
          .deletePost(action.payload)
          .pipe(
            map((results: string) => new DeletePostSuccess(action.payload))
          );
      },

      onError: (action: DeletePost, error: HttpErrorResponse) => {
        return new DeletePostError(error.error);
      },
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<PostsPartialState>,
    private readonly postsService: PostsService
  ) {}
}
