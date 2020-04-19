import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  ISharedDataAccessModuleConfig,
  SharedDataAccessModuleConfig
} from '@blog/shared/data-access';
import {POSTS_API_PATH} from '../shared/constants';
import {IPost} from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  basePath: string;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(SharedDataAccessModuleConfig)
    private readonly dataAccessConfig: ISharedDataAccessModuleConfig
  ) {
    this.basePath = `${this.dataAccessConfig.apiBasePath}/${POSTS_API_PATH}`;
  }

  findAll(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.basePath}`);
  }

  findOneById(id: string): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.basePath}/${id}`);
  }

  createPost(post: IPost): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.basePath}`, post);
  }

  deletePost(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.basePath}/${id}`);
  }

  updatePost(data: {id: string; updates: Partial<IPost>}): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${this.basePath}/${data.id}`,
      data.updates
    );
  }
}
