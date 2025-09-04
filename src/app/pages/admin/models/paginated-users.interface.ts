import {User} from './user.interface';

export interface PaginatedUsers {
  totalCount: number,
  pageNumber: number,
  content: User[]
}
