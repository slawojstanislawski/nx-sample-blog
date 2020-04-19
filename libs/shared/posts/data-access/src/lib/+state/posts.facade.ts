import {select, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

import {
  CreatePost,
  DeletePost,
  LoadPost,
  LoadPosts,
  SetSelected,
  UpdatePost
} from './posts.actions';
import {PostsPartialState} from './posts.reducer';
import {postsQuery} from './posts.selectors';
import {IPost} from '../shared/types';

@Injectable()
export class PostsFacade {
  errorList$ = this.store.pipe(select(postsQuery.getErrorList));
  errorSingleItem$ = this.store.pipe(select(postsQuery.getErrorSingleItem));
  loading$ = this.store.pipe(select(postsQuery.getLoading));
  allPosts$ = this.store.pipe(select(postsQuery.getAllPosts));
  updating$ = this.store.pipe(select(postsQuery.getUpdating));
  deleting$ = this.store.pipe(select(postsQuery.getDeleting));
  selectedPost$ = this.store.pipe(select(postsQuery.getSelectedPost));

  constructor(private store: Store<PostsPartialState>) {}

  setSelected(id: string): void {
    this.store.dispatch(new SetSelected(id));
  }

  loadAll() {
    this.store.dispatch(new LoadPosts());
  }

  loadPost(id: string) {
    this.store.dispatch(new LoadPost(id));
  }

  createPost(post: IPost): void {
    this.store.dispatch(new CreatePost(post));
  }

  updatePost(id: string, updates: Partial<IPost>) {
    this.store.dispatch(new UpdatePost({id, updates}));
  }

  deletePost(id: string) {
    this.store.dispatch(new DeletePost(id));
  }
}
