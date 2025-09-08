import {LeaveApplication} from '../../manager/model/leave-application.interface';

export interface PaginatedLeaveApplication{
  totalCount: number,
  pageNumber: number,
  content: LeaveApplication[]
}
