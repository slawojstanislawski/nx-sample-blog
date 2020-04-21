import {IPost} from './types';

export class UpdatePostDto implements Partial<IPost> {
  readonly content?: IPost['content'];
  readonly title?: IPost['title'];
}
