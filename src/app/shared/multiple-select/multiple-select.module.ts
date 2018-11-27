import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { DragDropModule } from '@angular/cdk/drag-drop'
// import { ScrollDispatchModule } from '@angular/cdk/scrolling'
import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
} from '@angular/material'

import { MultipleSelectComponent } from './multiple-select.component'

const MODULES = [
	CommonModule,
	FlexLayoutModule,
	DragDropModule,
	// ScrollDispatchModule,

	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
]

const COMPONENTS = [
	MultipleSelectComponent
]

@NgModule({
	declarations: [...COMPONENTS],
	entryComponents: [...COMPONENTS],
	exports: [...MODULES,...COMPONENTS],
	imports: [
		...MODULES
	],
})
export class MultipleSelectModule {}
