// sample credentials used in tests
import { User } from './types';

export const credentials: { defaultUser: User } = {
  defaultUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe+${Date.now()}@example.com`,
    password: 'Password123!'
  }
};
