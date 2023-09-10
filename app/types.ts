export type Message = {
  id: string;
  createdAt?: Date;
  content: string;
  role: 'system' | 'user' | 'assistant' | 'function';
};

export type CreateMessage = Omit<Message, 'id'> & {
  id?: Message['id'];
};
