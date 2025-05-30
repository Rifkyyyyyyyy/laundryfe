// assets
import {
  IconPackage,
  IconCreditCard,
  IconChecklist ,
  IconBuildingWarehouse
  
} from '@tabler/icons-react';


import { privateAccess } from '../utils/baseFuncs';

// constant
const icons = {
  IconPackage,
  IconCreditCard,
  IconChecklist,

};

const isOwner = privateAccess();

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const business = {
  id: 'BusinessManagement',
  title: 'Business Management',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.IconPackage,
      breadcrumbs: false
    },
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/payments',
      icon: icons.IconCreditCard,
      breadcrumbs: false
    },
    // hanya tampil kalau bukan owner
    ...(!isOwner
      ? [
          {
            id: 'todo',
            title: 'Todo',
            type: 'item',
            url: '/task',
            icon: icons.IconChecklist,
            breadcrumbs: false
          }
        ]
      : []),
  ]
};


export default business;
