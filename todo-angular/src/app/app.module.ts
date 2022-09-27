import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BubbleComponent } from './bubble.component';
import { InsertionComponent } from './insertion.component';
import { SelectionComponent } from './selection.component';
import { MergeComponent } from './merge.component';
import { QuickComponent } from './quick.component';

@NgModule({
    declarations: [
        AppComponent,
        BubbleComponent,
        InsertionComponent,
        SelectionComponent,
        MergeComponent,
        QuickComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
