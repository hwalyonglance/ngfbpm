import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'

import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatOptionModule,
	MatSelectModule,
	MatTooltipModule,
} from '@angular/material'

import { WysiwygHtmlEditorComponent } from './wysiwyg-html-editor.component';

const MODULES = [
	CommonModule,
	FlexLayoutModule,

	MatButtonModule,
	MatIconModule,
	MatFormFieldModule,
	MatOptionModule,
	MatSelectModule,
	MatTooltipModule,
]

const COMPONENTS = [
	WysiwygHtmlEditorComponent
]

@NgModule({
	imports: [
		...MODULES,
	],
	declarations: [
		...COMPONENTS,
	],
	exports: [
		...MODULES,
		...COMPONENTS,
	],
})
export class WysiwygHtmlEditorModule { }
