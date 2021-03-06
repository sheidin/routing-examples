import { ServerResolverService } from './servers/server-resolver.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AppGuardService } from './app-guard.service';

import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children:
    [
      { path: ':id/:name', component: UserComponent },
    ]
    },
    { path: 'servers',
    // canActivate: [AppGuardService],
    canActivateChild: [AppGuardService],
    component: ServersComponent,
    children:
    [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
    },
    // { path: '404', component: PageNotFoundComponent},
    { path: '404', component: PageNotFoundComponent, data: {message: 'Page not found!'}},
    { path: '**', redirectTo: '/404'} // ** must be in the end of routes
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
