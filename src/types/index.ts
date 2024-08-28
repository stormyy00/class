export interface course {
  id: string;
  name: string;
  code: string;
  description: string | null;
  credits: number;
}

export interface class_ {
    startTime: string;
    endTime: string;
    dayOfWeek: string;
    location: string;
}
