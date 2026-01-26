interface EventItem {
  title: string;
  description: string;
  date?: string;
}

interface TimePeriod {
  id: string;
  label: string; // подпись периода
  from: number; // число слева
  to: number; // число справа
  events: EventItem[];
}
