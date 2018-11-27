import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
	selector: 'app-save-confirmation-dialog',
	templateUrl: './save-confirmation-dialog.component.html',
	styles: []
})
export class SaveConfirmationDialogComponent implements OnInit {
	cancel = new EventEmitter
	accept = new EventEmitter
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {},
		public dialogRef: MatDialogRef<SaveConfirmationDialogComponent>
	) {}
	ngOnInit() {}
}
