const mapping: Record<string, string> = {
  banks: 'bank',
  bills: 'bill',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
