import {select, Store, Action} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Update} from '@ngrx/entity';

import * as PostsSelectors from './posts.selectors';
import * as PostsActions from './posts.actions';
import * as fromPosts from './posts.reducer';
import {IPost} from '../shared/types';

@Injectable()
export class PostsFacade {
  errorList$ = this.store.pipe(select(PostsSelectors.getErrorList));
  errorSingleItem$ = this.store.pipe(select(PostsSelectors.getErrorSingleItem));
  loading$ = this.store.pipe(select(PostsSelectors.getLoading));
  allPosts$ = this.store.pipe(select(PostsSelectors.getAllPosts));
  updating$ = this.store.pipe(select(PostsSelectors.getUpdating));
  deleting$ = this.store.pipe(select(PostsSelectors.getDeleting));
  selectedPost$ = this.store.pipe(select(PostsSelectors.getSelected));

  constructor(private store: Store<fromPosts.PostsPartialState>) {}

  setSelected(id: string): void {
    this.store.dispatch(PostsActions.setSelected({id}));
  }

  loadAll() {
    this.store.dispatch(PostsActions.loadPosts());
  }

  loadPost(id: string) {
    this.store.dispatch(PostsActions.loadPost({id}));
  }

  createPost(post: IPost): void {
    this.store.dispatch(PostsActions.createPost({post}));
  }

  updatePost(update: Update<IPost>) {
    this.store.dispatch(PostsActions.updatePost({update}));
  }

  deletePost(id: string) {
    this.store.dispatch(PostsActions.deletePost({id}));
  }
}
