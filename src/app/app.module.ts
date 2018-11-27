import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule, } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import {
	DatatableModule,
	DialogModule,
	MultipleSelectModule,
	FileExplorerModule,
	FileUploaderModule,
	WysiwygHtmlEditorModule
} from './shared'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule.enablePersistence(),
		AppRoutingModule,
		DatatableModule, DialogModule, MultipleSelectModule, FileExplorerModule, FileUploaderModule, WysiwygHtmlEditorModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
