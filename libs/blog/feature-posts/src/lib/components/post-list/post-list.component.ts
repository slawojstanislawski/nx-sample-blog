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
import {IPost, PostsFacade} from '@blog/shared/posts/data-access';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-posts-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts$: Observable<IPost[]>;
  postsLoading$: Observable<boolean>;
  postsErrorList$: Observable<string | undefined>;
  postsErrorSingleItemSubscription$: Subscription;
  postDeleting$: Observable<boolean>;

  constructor(
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
    this.postsErrorSingleItemSubscription$ = this.postsFacade.errorSingleItem$
      .pipe(map(this.errToSnackbarMapper))
      .subscribe();
    this.postsFacade.loadAll();
  }

  ngOnDestroy(): void {}

  onPostDelete(id: string) {
    this.postsFacade.deletePost(id);
  }
}
