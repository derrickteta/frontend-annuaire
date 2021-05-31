import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './carnet/address-list/address-list.component';
import { LoginComponent } from './carnet/auth/login/login.component';
import { SignupComponent } from './carnet/auth/signup/signup.component';
import { CarnetComponent } from './carnet/carnet.component';
import { ModifyAddressComponent } from './carnet/modify-address/modify-address.component';
import { NewAddressComponent } from './carnet/new-address/new-address.component';
import { SingleAddressComponent } from './carnet/single-address/single-address.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'carnet', component: CarnetComponent,
    children: [
      { path: 'new-address', component: NewAddressComponent , canActivate: [AuthGuard] },
      { path: 'all-address', component: AddressListComponent , canActivate: [AuthGuard] },
      { path: 'address/:id', component: SingleAddressComponent , canActivate: [AuthGuard] },
      { path: 'modify-address/:id', component: ModifyAddressComponent , canActivate: [AuthGuard]},
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-address' }
    ]
  },
  { path: 'default', component: CarnetComponent },
  { path: '', pathMatch: 'full', component: CarnetComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
