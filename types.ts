
export interface Story {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Badge {
  label: string;
  unlocked: boolean;
}

export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD'
}
