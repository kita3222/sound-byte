import { useMemo } from 'react';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('Article'),
            path: '/',
            icon: ICONS.blog,
            children: [
              { title: t('list'), path: '/article' },
              { title: t('create'), path: '/article/create' },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
