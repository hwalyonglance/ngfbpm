import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
	selector: 'app-save-change-confirmation-dialog',
	templateUrl: './save-change-confirmation-dialog.component.html',
	styles: []
})
export class SaveChangeConfirmationDialogComponent implements OnInit {
	cancel = new EventEmitter
	accept = new EventEmitter
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {},
		public dialogRef: MatDialogRef<SaveChangeConfirmationDialogComponent>
	) {}
	ngOnInit() {}
}
