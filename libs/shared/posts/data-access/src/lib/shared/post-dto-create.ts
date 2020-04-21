import {IPost} from './types';

export class CreatePostDto implements IPost {
  readonly content: IPost['content'];
  readonly title: IPost['title'];
}
