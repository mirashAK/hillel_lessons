import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BubbleComponent } from './bubble.component';
import { InsertionComponent } from './insertion.component';
import { SelectionComponent } from './selection.component';

const routes: Routes = [
  { path: '', redirectTo: '/bubble', pathMatch: 'full' },
  { path: 'bubble', component: BubbleComponent },
  { path: 'insertion', component: InsertionComponent },
  { path: 'selection', component: SelectionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
