import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SnackbarService} from '@blog/shared/snackbar';
import {IPost} from '@blog/shared/posts/data-access';

@Component({
  selector: 'sh-posts-ui-post-edit-form',
  templateUrl: './post-edit-form.component.html',
  styleUrls: ['./post-edit-form.component.scss']
})
export class PostEditFormComponent implements OnInit {
  @Input() post: IPost;
  @Input() updating: boolean;
  @Input() buttonText = 'Create Post';
  @Input() isEditing = false;
  @Output() created: EventEmitter<IPost>;
  @Output() edited: EventEmitter<Partial<IPost>>;
  @Output() cancelled: EventEmitter<void>;
  formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackbarService: SnackbarService
  ) {
    this.created = new EventEmitter<IPost>();
    this.edited = new EventEmitter<Partial<IPost>>();
    this.cancelled = new EventEmitter<void>();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: this.fb.control('', Validators.required),
      content: this.fb.control('', Validators.required)
    });
    if (this.post) {
      this.formGroup.patchValue(this.post);
    }
  }

  submit(): void {
    if (!this.formGroup.valid) {
      this.snackbarService.failure('The form is invalid');
      return;
    }
    if (this.isEditing) {
      this.edited.emit(this.formGroup.value);
    } else {
      this.created.emit(this.formGroup.value);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
    this.formGroup.patchValue(this.post);
  }
}
