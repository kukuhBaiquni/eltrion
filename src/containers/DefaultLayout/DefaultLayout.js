import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import '../../Custom Resources/Dark-Background.css';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import { CONSTANT, COLORS } from '../../Configuration';

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
import { RotateSpinner } from 'react-spinners-kit';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    loading = () => <RotateSpinner loading={true} color={COLORS.primary} />

    signOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/login');
    };

    componentWillMount() {
        const add = {
            name: 'Notifications',
            icon: 'fa fa-bell',
            badge: {
                variant: 'info',
                text: '26',
            },
            children: [
                {
                    name: 'Transaction',
                    url: '/notifications/transaction',
                    badge: {
                        variant: 'warning',
                        text: '23',
                    },
                },
                {
                    name: 'System',
                    url: '/notifications/system',
                    badge: {
                        variant: 'danger',
                        text: '3',
                    },
                }
            ]
        };
        navigation.items.splice(4, 0, add);
        const token = localStorage.getItem('token');
        if (!token) {
            this.props.history.replace('/login');
        }
    };

    componentWillUnmouont() {
        navigation.splice(4, 1);
    };

    // componentDidMount() {
    //     this._openNotification()
    // };

    _openNotification = () => {
        const args = {
            message: CONSTANT.incomeOrder.title,
            description: CONSTANT.incomeOrder.description,
            duration: 0,
            style: {
                top: 50,
                backgroundColor: '#e2e2ff',
                borderColor: '#23282c'
            },
            onClick: () => notification.info(args)
        };
        notification.info(args);
    };

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
