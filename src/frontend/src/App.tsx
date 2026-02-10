import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import PostDetailsPage from './pages/PostDetailsPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts',
  component: PostsPage,
});

const postDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  component: PostDetailsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  postsRoute,
  postDetailsRoute,
  aboutRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
