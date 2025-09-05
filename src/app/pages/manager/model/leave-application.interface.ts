
export interface LeaveRequest {
  id: number;
  startDate: String;
  endDate: String;
  numberOfDays: number;
  reason: String;
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
