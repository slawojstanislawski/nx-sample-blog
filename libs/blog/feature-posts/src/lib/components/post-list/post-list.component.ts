import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {
  ErrorToIndicatorMapper,
  ErrorToMessageMapper,
  IErrorToIndicatorMapper,
  IErrorToStringMapper
} from '@blog/shared/error-mapper';
import {IPost, PostsEffects, PostsFacade} from '@blog/shared/posts/data-access';
import {SnackbarService} from '@blog/shared/snackbar';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-posts-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts$: Observable<IPost[]>;
  postsLoading$: Observable<boolean>;
  postDeleting$: Observable<boolean>;
  postsErrorList$: Observable<string | undefined>;
  postsErrorSingleItemSubscription: Subscription;
  deletePostSuccessSubscription: Subscription;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly postsEffects: PostsEffects,
    private readonly postsFacade: PostsFacade,
    @Inject(ErrorToMessageMapper)
    private readonly errToStrMapper: IErrorToStringMapper,
    @Inject(ErrorToIndicatorMapper)
    private readonly errToSnackbarMapper: IErrorToIndicatorMapper
  ) {}

  ngOnInit() {
    this.posts$ = this.postsFacade.allPosts$;
    this.postDeleting$ = this.postsFacade.deleting$;
    this.postsLoading$ = this.postsFacade.loading$;
    this.postsErrorList$ = this.postsFacade.errorList$.pipe(
      map(this.errToStrMapper)
    );
    this.postsErrorSingleItemSubscription = this.postsFacade.errorSingleItem$
      .pipe(map(this.errToSnackbarMapper))
      .subscribe();
    this.deletePostSuccessSubscription = this.postsEffects.deletePostSuccess$.subscribe(
      () => {
        this.snackbarService.success('Post Deleted');
      }
    );
    this.postsFacade.loadAll();
  }

  ngOnDestroy(): void {}

  onPostDelete(id: string) {
    this.postsFacade.deletePost(id);
  }
}
