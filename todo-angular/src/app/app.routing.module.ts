import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BubbleComponent } from './bubble.component';
import { InsertionComponent } from './insertion.component';

const routes: Routes = [
  { path: '', redirectTo: '/bubble', pathMatch: 'full' },
  { path: 'bubble', component: BubbleComponent },
  { path: 'insertion', component: InsertionComponent },
//   { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
