import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './page/search/search.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'user/:id', component: UserComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
