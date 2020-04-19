import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {IPost, PostsEffects, PostsFacade} from '@blog/shared/posts/data-access';
import {
  ErrorToMessageMapper,
  IErrorToStringMapper
} from '@blog/shared/error-mapper';
import {SnackbarService} from '@blog/shared/snackbar';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-posts-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  private postId: string;
  private updateSuccessSubscription: Subscription;
  post$: Observable<IPost | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;
  updating$: Observable<boolean>;
  editing = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsFacade: PostsFacade,
    private readonly postsEffects: PostsEffects,
    private readonly snackbarService: SnackbarService,
    @Inject(ErrorToMessageMapper)
    private readonly errToStrMapper: IErrorToStringMapper
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.postId = id;
    this.postsFacade.setSelected(this.postId);
    this.post$ = this.postsFacade.selectedPost$;
    this.loading$ = this.postsFacade.loading$;
    this.updating$ = this.postsFacade.updating$;
    this.error$ = this.postsFacade.errorList$.pipe(map(this.errToStrMapper));
    this.postsFacade.loadPost(this.postId);
    this.updateSuccessSubscription = this.postsEffects.updatePostSuccess$.subscribe(
      () => {
        this.snackbarService.success('The post has been updated');
        this.router.navigate(['../']);
      }
    );
  }

  ngOnDestroy(): void {}

  onEdit(): void {
    this.editing = true;
  }

  onCancel(): void {
    this.editing = false;
  }

  updatePost(updates: Partial<IPost>) {
    this.postsFacade.updatePost(this.postId, updates);
  }
}
