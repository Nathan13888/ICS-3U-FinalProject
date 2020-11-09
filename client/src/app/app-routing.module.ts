import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './page/search/search.component';
import { NewUserComponent } from './page/user/new-user/new-user.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'user/new', component: NewUserComponent},
  {path: 'user/:id', component: UserComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
