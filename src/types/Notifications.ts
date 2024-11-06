export type NotificationTypes = 'success' | 'error';

export type Notification = {
  id: number;
  type: NotificationTypes;
  text: string;
};
