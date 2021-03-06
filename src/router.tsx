import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import OnboardingPhone from './content/onboarding/phone';
import OnboardingVerification from './content/onboarding/verification';
import OnboardingPin from './content/onboarding/pin';
import TermsAndPolicy from './content/pages/Docs/TermsAndPolicy';
import OnboardingOrderType from './content/onboarding/ordertype';
import OnboardingQueue from './content/onboarding/queue';
import OnboardingAcceptOrder from './content/onboarding/acceptorder';
import FAQ from './content/pages/Docs/FAQ';
import Logout from './content/login/logout';
import { isVendorApp } from './models/constant';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

//Admin
const VenuesPage = Loader(lazy(() => import('src/content/admin/venues')));
const VendorsPage = Loader(lazy(() => import('src/content/admin/vendors')));
const MenuItemsPage = Loader(lazy(() => import('src/content/admin/menuitems')));
const StaffsPage = Loader(lazy(() => import('src/content/admin/staff')));
const PromosPage = Loader(lazy(() => import('src/content/admin/promos')));
const CustomersPage = Loader(lazy(() => import('src/content/admin/customers')));
const VenueAreasPage = Loader(lazy(() => import('src/content/admin/venuearea')));
const VenueLocationsPage = Loader(lazy(() => import('src/content/admin/venuelocation')));

// Dashboards
const Dashboard = Loader(lazy(() => import('src/content/dashboards')));

// Settings

const UserProfile = Loader(lazy(() => import('src/content/pages/UserProfile')));
const StaffSettings = Loader(
  lazy(() => import('src/content/pages/settings/Staff'))
);
const MenuSettings = Loader(
  lazy(() => import('src/content/pages/settings/Menus'))
);
const OrderSettings = Loader(
  lazy(() => import('src/content/pages/settings/Orders'))
);
const PrinterSettings = Loader(
  lazy(() => import('src/content/pages/settings/Printers'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const LoginPage = Loader(lazy(() => import('src/content/login')));

//Orders
const OrdersPage = Loader(lazy(() => import('src/content/orders')));

const vendorRoutes: RouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'terms_policy',
        element: <TermsAndPolicy />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'onboarding',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="phone" replace />
      },
      {
        path: 'phone',
        element: <OnboardingPhone />
      },
      {
        path: 'verification',
        element: <OnboardingVerification />
      },
      {
        path: 'pin',
        element: <OnboardingPin />
      },
      {
        path: 'ordertype',
        element: <OnboardingOrderType />
      },
      {
        path: 'queue',
        element: <OnboardingQueue />
      },
      {
        path: 'acceptorder',
        element: <OnboardingAcceptOrder />
      }
    ]
  },
  {
    path: 'help',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <FAQ />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'profile',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'settings',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/settings/staff" replace />
      },
      {
        path: 'staff',
        element: <StaffSettings />
      },
      {
        path: 'menus',
        element: <MenuSettings />
      },
      {
        path: 'orders',
        element: <OrderSettings />
      },
      {
        path: 'printers',
        element: <PrinterSettings />
      }
    ]
  },
  {
    path: 'orders',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/orders/new" replace />
      },
      {
        path: 'new',
        element: <OrdersPage type='new' />
      },
      {
        path: 'preparing',
        element: <OrdersPage type='preparing' />
      },
      {
        path: 'pickup',
        element: <OrdersPage type='pickup' />
      },
      {
        path: 'delivery',
        element: <OrdersPage type='delivery' />
      },
      {
        path: 'all',
        element: <OrdersPage type='all' />
      }
    ]
  }
];

const adminRoutes: RouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'terms_policy',
        element: <TermsAndPolicy />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'help',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <FAQ />
      }
    ]
  },
  {
    path: 'orders',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <OrdersPage type='all' />
      }
    ]
  },
  {
    path: 'venues',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <VenuesPage />
      }
    ]
  },
  {
    path: 'vendorstands',
    element: <SidebarLayout />,
    children: [
      {
        path: ':venueId',
        element: <VendorsPage />
      },
      {
        path: '',
        element: <VendorsPage />
      }
    ]
  },
  {
    path: 'promos',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <PromosPage />
      }
    ]
  },
  {
    path: 'customers',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '',
        element: (
          <CustomersPage />
        )
      }
    ]
  },
  {
    path: 'menuitems',
    element: <SidebarLayout />,
    children: [
      {
        path: ':vendorId',
        element: <MenuItemsPage />
      },
      {
        path: '',
        element: <MenuItemsPage />
      }
    ]
  },
  {
    path: 'staff',
    element: <SidebarLayout />,
    children: [
      {
        path: ':vendorId',
        element: <StaffsPage />
      },
      {
        path: '',
        element: <StaffsPage />
      }
    ]
  },
  {
    path: 'venueareas',
    element: <SidebarLayout />,
    children: [
      {
        path: ':venueId',
        element: <VenueAreasPage />
      },
      {
        path: '',
        element: <VenueAreasPage />
      }
    ]
  },
  {
    path: 'venuelocations',
    element: <SidebarLayout />,
    children: [
      {
        path: ':venueId',
        element: <VenueLocationsPage />
      },
      {
        path: '',
        element: <VenueLocationsPage />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  }
];

const routes = isVendorApp ? vendorRoutes : adminRoutes;
export default routes;
