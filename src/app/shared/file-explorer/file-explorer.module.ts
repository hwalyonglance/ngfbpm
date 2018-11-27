import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileExplorerComponent } from './file-explorer.component';

import {
	MatButtonModule,
	MatFormFieldModule,
	MatGridListModule,
	MatInputModule,
	MatTabsModule,
} from '@angular/material';

const MODULES = [
	CommonModule,

	MatButtonModule,
	MatFormFieldModule,
	MatGridListModule,
	MatInputModule,
	MatTabsModule,
]

const COMPONENTS = [
	FileExplorerComponent
]

@NgModule({
	declarations: [...COMPONENTS],
	exports: [...MODULES,...COMPONENTS],
	entryComponents: [...COMPONENTS],
	imports: [
		...MODULES
	],
})
export class FileExplorerModule { }
