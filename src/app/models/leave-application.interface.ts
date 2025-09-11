export interface LeaveApplication{
  id: number;
  name: string;
  dateApplied: string;
  manager: string;
  approver: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'CANCELLED';
}
