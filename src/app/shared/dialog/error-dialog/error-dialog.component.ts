import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
	selector: 'app-error-dialog',
	templateUrl: './error-dialog.component.html',
	styles: []
})
export class ErrorDialogComponent implements OnInit {
	close = new EventEmitter
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {},
		public dialogRef: MatDialogRef<ErrorDialogComponent>
	) {}
	ngOnInit() {}
}
