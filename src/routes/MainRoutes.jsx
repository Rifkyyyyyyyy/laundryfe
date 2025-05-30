import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from './privateRoutes/privateRoutes';
import { privateAccess } from '../utils/baseFuncs';

// Lazy-loaded views
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const DiscountViews = Loadable(lazy(() => import('../views/products/Discount')));
const OutletViews = Loadable(lazy(() => import('../views/features/Outlet')));
const ProductViews = Loadable(lazy(() => import('../views/products/Product')));
const OrderView = Loadable(lazy(() => import('../views/business/orders/OrdersViews')));
const PaymentView = Loadable(lazy(() => import('../views/business/PaymentViews')));
const ServicesView = Loadable(lazy(() => import('../views/products/ServicesView')));
const MemberViews = Loadable(lazy(() => import('../views/hr/Member')));
const CashiersViews = Loadable(lazy(() => import('../views/hr/Cashiers')));
const CustomersViews = Loadable(lazy(() => import('../views/hr/Customers')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));
const TodoViews = Loadable(lazy(() => import('../views/business/TodoViews')));
const StockView = Loadable(lazy(() => import('../views/business/StokViews')));
const ReportsView = Loadable(lazy(() => import('../views/features/Reports')));

const isOwner = privateAccess();

const childrenRoutes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DashboardDefault />
      </PrivateRoute>
    )
  },
  {
    path: 'dashboard/default',
    element: (
      <PrivateRoute>
        <DashboardDefault />
      </PrivateRoute>
    )
  },
  {
    path: 'sample-page',
    element: (
      <PrivateRoute>
        <SamplePage />
      </PrivateRoute>
    )
  },
  {
    path: 'discount',
    element: (
      <PrivateRoute>
        <DiscountViews />
      </PrivateRoute>
    )
  },
  {
    path: 'outlet',
    element: (
      <PrivateRoute>
        <OutletViews />
      </PrivateRoute>
    )
  },

  // Hanya tambahkan route cashiers jika owner
  ...(isOwner
    ? [
      {
        path: 'cashiers',
        element: (
          <PrivateRoute>
            <CashiersViews />
          </PrivateRoute>
        )
      },

    ]
    : []),


  {
    path: 'product',
    element: (
      <PrivateRoute>
        <ProductViews />
      </PrivateRoute>
    )
  },
  {
    path: 'member',
    element: (
      <PrivateRoute>
        <MemberViews />
      </PrivateRoute>
    )
  },
  {
    path: 'orders',
    element: (
      <PrivateRoute>
        <OrderView />
      </PrivateRoute>
    )
  },
  {
    path: 'payments',
    element: (
      <PrivateRoute>
        <PaymentView />
      </PrivateRoute>
    )
  },

  {
    path: 'stock',
    element: (
      <PrivateRoute>
        <StockView />
      </PrivateRoute>
    )
  },
  {
    path: 'service',
    element: (
      <PrivateRoute>
        <ServicesView />
      </PrivateRoute>
    )
  },
  {
    path: 'customers',
    element: (
      <PrivateRoute>
        <CustomersViews />
      </PrivateRoute>
    )
  },
  {
    path: 'reports',
    element: (
      <PrivateRoute>
        <ReportsView />
      </PrivateRoute>
    )
  },
  {
    path: 'task',
    element: (
      <PrivateRoute>
        <TodoViews />
      </PrivateRoute>
    )
  }
];

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: childrenRoutes
};

export default MainRoutes;
