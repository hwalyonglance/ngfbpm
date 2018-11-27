import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
	selector: 'app-failed-to-save-dialog',
	templateUrl: './failed-to-save-dialog.component.html',
	styles: []
})
export class FailedToSaveDialogComponent implements OnInit {
	close = new EventEmitter
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {},
		public dialogRef: MatDialogRef<FailedToSaveDialogComponent>
	) {}
	ngOnInit() {}
}
