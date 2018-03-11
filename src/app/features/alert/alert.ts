export class Alert {
  label: string;
  type: AlertType;
  message: string;
  timeout: number;
}

export enum AlertType {
  info,
  warning,
  error
}
