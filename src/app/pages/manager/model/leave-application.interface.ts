
export interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: String;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'CANCELLED';
}
