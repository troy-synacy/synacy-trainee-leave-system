
export interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: String;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'CANCELLED';
}

export interface LeaveApplication{
  name: string;
  appliedDate: String;
  manager: String;
  startDate: String;
  endDate: String;
  numberOfDays: number;
  status: String;
}
