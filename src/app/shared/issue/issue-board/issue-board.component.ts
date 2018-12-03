import {
	AfterViewInit,
	Component,
	EventEmitter,
	Query,
	QueryList,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router'

import { Observable, from, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

import { ApiService } from '../../s'
import { IAccount } from '../../accounts'

import { IIssue } from '../issue'

@Component({
	selector: 'app-issue-board',
	templateUrl: './issue-board.component.html',
	styles: [`
	.container {
		width: 20%;
		max-width: 100%;
		margin: 0 8px;
		display: inline-block;
		vertical-align: top;
		background-color: #DDD;
		padding: 0 4px 4px;
	}

	.list {
		border: solid 1px #ccc;
		min-height: 60px;
		background: white;
		border-radius: 4px;
		display: block;
		overflow: hidden;
	}

	.list-item {
		padding: 10px 5px;
		border-bottom: solid 1px #ccc;
		box-sizing: border-box;
		cursor: move;
		background: white;
		color: black;
		font-size: 14px;
	}

	.list-item:last-child {
		border: none;
	}

	/* Highlight the list item that is being dragged. */
	.cdk-drag-preview {
		border-radius: 4px;
		box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
		0 8px 10px 1px rgba(0, 0, 0, 0.14),
		0 3px 14px 2px rgba(0, 0, 0, 0.12);
	}

	/* Animate items as they're being sorted. */
	.cdk-drop-dragging .cdk-drag {
		transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
	}

	/* Animate an item that has been dropped. */
	.cdk-drag-animating {
		transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
	}

	.cdk-drag-placeholder {
		opacity: 0;
	}

	h2 {
		margin: 8px 0;
	}
	`]
})
export class IssueBoardComponent implements AfterViewInit, OnInit {
	@Input() issues: IIssue[] = []
	get unassignedIssues$() {
		const { teamUid, projectUid } = this._activatedRoute.snapshot.params
		const col = 'teams/'+teamUid+'/projects/'+projectUid+'/issues'
		return this._api.col(col, (ref)=>{
			return ref.where('assigneeUid', '==', '')
		}).valueChanges()
	}
	get assignedIssues$() {
		const { teamUid, projectUid } = this._activatedRoute.snapshot.params
		const col = 'teams/'+teamUid+'/projects/'+projectUid+'/issues'
		return this._api.col(col, (ref) => {
			return ref.where('assigneeUid', '>','')
		}).valueChanges()
	}
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _api: ApiService,
	) {}
	ngAfterViewInit(){}
	ngOnInit(){}
}
