export interface User{
  id: number,
  name: string,
  role: string,
  totalLeaveCredits: number,
  remainingLeaveCredits: number,
  manager?: string | null
}
