export const ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  SUBSCRIPTIONS: '/subscriptions',
  SUBSCRIPTION: (id: number) => `/subscriptions/${id}`,
  CREATE_GROUP: '/groups/create',
  GROUP: (id: number) => `/groups/${id}`,
  GROUPS: '/groups',
};

