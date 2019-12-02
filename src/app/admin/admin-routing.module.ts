import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './guard/auth/auth.guard';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {

}