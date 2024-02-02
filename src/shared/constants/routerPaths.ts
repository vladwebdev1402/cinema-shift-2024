const root = '';

export const ROUTER_PATHS = {
  main: root + '',
  profile: root + '/profile',
  tickets: root + '/tickets',
  filmDetail: root + '/film/:id',
  auth: root + '/auth',
  navFilmDetail: (id: string) => `${root}film/${id}`,
};
