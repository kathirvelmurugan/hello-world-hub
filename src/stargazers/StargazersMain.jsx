import "./index.css";
import { Toaster } from "@/stargazers/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/stargazers/lib/query-client'
import VisualEditAgent from '@/stargazers/lib/VisualEditAgent'
import NavigationTracker from '@/stargazers/lib/NavigationTracker'
import { pagesConfig } from '@/stargazers/pages.config'
import { Route, Routes } from 'react-router-dom';
import { setupIframeMessaging } from '@/stargazers/lib/iframe-messaging';
import PageNotFound from '@/stargazers/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/stargazers/lib/AuthContext';
import UserNotRegisteredError from '@/stargazers/components/UserNotRegisteredError';
const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => <></>;

setupIframeMessaging();

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
    <Layout currentPageName={currentPageName}>{children}</Layout>
    : <>{children}</>;

const AuthenticatedApp = () => {
    const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

    // Show loading spinner while checking app public settings or auth
    if (isLoadingPublicSettings || isLoadingAuth) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    // Handle authentication errors
    if (authError) {
        if (authError.type === 'user_not_registered') {
            return <UserNotRegisteredError />;
        } else if (authError.type === 'auth_required') {
            // Redirect to login automatically
            navigateToLogin();
            return null;
        }
    }

    // Render the main app
    return (
        <div className="dark">
            <LayoutWrapper currentPageName={mainPageKey}>
                <Routes>
                    <Route index element={<MainPage />} />
                    {Object.entries(Pages).map(([path, Page]) => (
                        <Route key={path} path={path.toLocaleLowerCase().replace("detail", "")} element={<Page />} />
                    ))}


                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </LayoutWrapper>
        </div>
    );
};

export default function StargazersMain() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClientInstance}>
                <NavigationTracker />
                <AuthenticatedApp />
                <Toaster />
                <VisualEditAgent />
            </QueryClientProvider>
        </AuthProvider>
    )
}
