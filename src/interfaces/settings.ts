export type PreferredCurrency = 'EUR' | 'UAH' | 'USD';

export type Settings = {
  preferredCurrency: PreferredCurrency | null;
};

export type UpdateSettingsPayload = {
  userId: string;
  settings: Partial<Settings>;
};

export type SettingsStateType = {
  loading: boolean;
  updating: boolean;
  data: Settings | null;
  error: unknown;
};
