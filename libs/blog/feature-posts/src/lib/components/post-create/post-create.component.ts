import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Observable, Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {
  ErrorToIndicatorMapper,
  IErrorToIndicatorMapper
} from '@blog/shared/error-mapper';
import {IPost, PostsFacade, PostsEffects} from '@blog/shared/posts/data-access';
import {SnackbarService} from '@blog/shared/snackbar';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-posts-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  errorSubscription: Subscription;
  successSubscription: Subscription;
  updating$: Observable<boolean>;
  created$ = this.postsEffects.created$;

  constructor(
    private readonly router: Router,
    private readonly postsFacade: PostsFacade,
    private readonly postsEffects: PostsEffects,
    @Inject(ErrorToIndicatorMapper)
    private readonly snackbarErrorMapper: IErrorToIndicatorMapper,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.updating$ = this.postsFacade.updating$;
    this.errorSubscription = this.postsFacade.errorList$
      .pipe(map(e => this.snackbarErrorMapper(e)))
      .subscribe();
    this.successSubscription = this.created$.pipe(first()).subscribe(() => {
      this.snackbarService.success('Post Created');
      this.router.navigate(['../']);
    });
  }

  ngOnDestroy(): void {}

  createPost(post: IPost): void {
    this.postsFacade.createPost(post);
  }
}
