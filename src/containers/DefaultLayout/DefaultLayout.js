import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import '../../Custom Resources/Dark-Background.css';

import {
  // AppAside,
  AppBreadcrumb,
  // AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import '../../Custom Resources/Dark-Theme.css';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    componentWillMount() {
        const add = {
            name: 'Notifications',
            icon: 'fa fa-bell',
            badge: {
                variant: 'info',
                text: '44',
            },
            children: [
                {
                    name: 'Online Transaction',
                    url: '/notifications/online',
                    badge: {
                        variant: 'success',
                        text: '12',
                    },
                },
                {
                    name: 'Offline Transaction',
                    url: '/notifications/offline',
                    badge: {
                        variant: 'warning',
                        text: '23',
                    },
                },
                {
                    name: 'Self Usage',
                    url: '/notifications/self-usage',
                    badge: {
                        variant: 'light',
                        text: '3',
                    },
                },
                {
                    name: 'Shopping Member',
                    url: '/notifications/shopping',
                    badge: {
                        variant: 'danger',
                        text: '4',
                    },
                }
            ]
        };
        navigation.items.splice(4, 0, add)
        const token = localStorage.getItem('token');
        if (!token) {
            this.props.history.replace('/login');
        }
    }

    render() {
        return (
            <div className="app dark-background">
                <AppHeader fixed>
                    <Suspense  fallback={this.loading()}>
                        <DefaultHeader props={this.props} onLogout={e=>this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <div style={{height: 30}} />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                            ) : (null);
                                        })}
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                {/*<AppFooter>
                <Suspense fallback={this.loading()}>
                <DefaultFooter />
                </Suspense>
                </AppFooter>*/}
            </div>
        );
    }
};

export default DefaultLayout;
