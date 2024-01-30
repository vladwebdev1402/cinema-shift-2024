const root = '';

export const routerPaths = {
  main: root + '',
  profile: root + '/profile',
  tickets: root + '/tickets',
  filmDetail: root + 'film/:id',
  navFilmDetail: (id: string) => root + `film/${id}`,
};
