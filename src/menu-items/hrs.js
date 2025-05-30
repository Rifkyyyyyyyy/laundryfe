import {
  IconUserPlus,
  IconUserCog,
  IconUser
} from '@tabler/icons-react';

import { privateAccess } from '../utils/baseFuncs';

// Constants
const icons = {
  IconUserPlus,
  IconUserCog,
  IconUser
};

// Ambil akses owner
const isOwner = privateAccess();

// Define children dengan kondisi filter menu kasir
const children = [
  {
    id: 'members',
    title: 'Members',
    type: 'item',
    url: '/member',
    icon: icons.IconUserPlus,
    breadcrumbs: false
  },

  // Menu kasir hanya untuk owner
  ...(isOwner
    ? [
        {
          id: 'cashiers',
          title: 'Cashiers',
          type: 'item',
          url: '/cashiers',
          icon: icons.IconUserCog,
          breadcrumbs: false
        }
      ]
    : []),

  {
    id: 'customers',
    title: 'Customers',
    type: 'item',
    url: '/customers',
    icon: icons.IconUser,
    breadcrumbs: false
  }
];

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const hrs = {
  id: 'UserManagement',
  title: 'User Management',
  type: 'group',
  children
};

export default hrs;
