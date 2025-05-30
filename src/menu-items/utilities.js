// assets
import {
  IconHome,
  IconBuildingWarehouse ,
  IconReport

} from '@tabler/icons-react';

// constant
const icons = {
  IconHome,
  IconBuildingWarehouse ,
  IconReport
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'OtherFeatures',
  title: 'Other',
  type: 'group',
  children: [

    {
      id: 'outlet',
      title: 'Outlet',
      type: 'item',
      url: '/outlet',
      icon: icons.IconHome,
      breadcrumbs: false
    } ,
    {
      id: 'stock',
      title: 'Stock',
      type: 'item',
      url: '/stock',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
  },
  {
    id: 'report',
    title: 'Reports',
    type: 'item',
    url: '/reports',
    icon: icons.IconReport,
    breadcrumbs: false
},
  ]
};

export default utilities;
