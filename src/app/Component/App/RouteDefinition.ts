import {
    AppLoginComponent,
    AppMyProfileComponent, AppPostsComponent,
    AppReportedClientsComponent,
    AppReportedPostsComponent,
    AppBlockedClientsComponent,
    AppUsersComponent
} from '../../component';

export const RouteDefinition = [
    {path: '/', redirectTo : ['Users'] },
    {path: '/my-profile', component: AppMyProfileComponent, name: 'MyProfile', data: {roles: ['ROLE_ADMIN']}},
    {path: '/users', component: AppUsersComponent, name: 'Users', data: {roles: ['ROLE_ADMIN']}},
    {path: '/posts', component: AppPostsComponent, name: 'Posts', data: {roles: ['ROLE_ADMIN']}},
    {path: '/posts/:username', component: AppPostsComponent, name: 'PostsByUser', data: {roles: ['ROLE_ADMIN']}},
    {path: '/login', component: AppLoginComponent, name: 'Login'},
    {path: '/logout', component: AppLoginComponent, name: 'Logout'},
    {path: '/reported-clients', component: AppReportedClientsComponent, name: 'ReportedClients', data: {roles: ['ROLE_ADMIN']}},
    {path: '/reported-posts', component: AppReportedPostsComponent, name: 'ReportedPosts', data: {roles: ['ROLE_ADMIN']}},
    {path: '/blocked-clients', component: AppBlockedClientsComponent, name: 'BlockedClients', data: {roles: ['ROLE_ADMIN']}},
];
