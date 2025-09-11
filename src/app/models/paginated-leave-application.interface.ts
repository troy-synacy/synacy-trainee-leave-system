import {LeaveApplication} from './leave-application.interface';

export interface PaginatedLeaveApplication{
  totalCount: number,
  pageNumber: number,
  content: LeaveApplication[]
}
