import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material'
import { AngularFireModule, } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import {
	DatatableModule,
	DialogModule,
	MultipleSelectModule,
	FileExplorerModule,
	FileUploaderModule,
	WysiwygHtmlEditorModule,
	IssueModule,
} from './shared'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DndComponent } from './dnd/dnd.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IndexComponent } from './c/index/index.component';

@NgModule({
	declarations: [
		AppComponent,
		DndComponent,
		IndexComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule.enablePersistence({
			experimentalTabSynchronization: true
		}),
		AppRoutingModule,
		MatChipsModule,

		DatatableModule, DialogModule, MultipleSelectModule, FileExplorerModule,
		FileUploaderModule, WysiwygHtmlEditorModule, DragDropModule, IssueModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
