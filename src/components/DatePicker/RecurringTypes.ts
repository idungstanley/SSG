export type DropProps = {
  recurringInterval: boolean;
  statusInterval: boolean;
  createTaskOption: boolean;
  statusUpdate: boolean;
};

export type RecurFrequency = { repeat?: number; end_date?: string };
export type TypeOptionsProps = {
  after?: string;
  monthly?: string;
  every_type?: string;
  every_count?: number;
  weekly_day_numbers?: string[];
  monthly_day_number?: string;
  monthly_week_number?: string;
  monthly_week_day_number?: string;
  yearly_month_number?: string;
  yearly_month_day_number?: string;
};

export type customOptionsProps = {
  every_type?: string;
  every_count?: number;
  weekly_day_numbers?: string[];
  monthly_day_number?: string;
  monthly_week_number?: string;
  monthly_week_day_number?: string;
  yearly_month_number?: string;
  yearly_month_day_number?: string;
};
