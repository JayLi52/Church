import {useSelector} from 'react-redux';
import {RootState} from '@store/store';

export const useTabBarLabel = (defaultLabels: {[key: string]: string}) => {
  const pageType = useSelector((state: RootState) => state.page.pageType);

  const getLabel = (routeName: string) => {
    if (pageType === 'teamManage') {
      switch (routeName) {
        case 'OrganizationTask':
          return '灵修管理';
        case 'Organization':
          return '组织管理';
        case 'BookManageNavigator':
          return '书籍管理';
        default:
          return defaultLabels[routeName];
      }
    }
    return defaultLabels[routeName];
  };

  return getLabel;
}; 