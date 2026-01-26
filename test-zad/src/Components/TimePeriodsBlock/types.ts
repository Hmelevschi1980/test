export interface TimePeriod {
  id: string;
  label: string;
  from: number;
  to: number;
  events: TimePeriodEvent[];
}

export interface TimePeriodEvent {
  year: number;
  description: string;
}
