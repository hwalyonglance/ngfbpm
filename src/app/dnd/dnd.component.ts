import {
	AfterViewInit, Component,
	Query, QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-dnd',
	templateUrl: './dnd.component.html',
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
	`],
})
export class DndComponent implements AfterViewInit {
	@ViewChildren(CdkDropList) cdl: QueryList<CdkDropList>
	get(state: 'todo'|'inprogress'|'qa'|'done') {
		return this[state]
	}
	get todo() { return this._todo }
	set todo(v) { this._todo = v }
	private _todo = []
	get inprogress() { return this._inprogress }
	set inprogress(v) { this._inprogress = v }
	private _inprogress = []
	get qa() { return this._qa }
	set qa(v) { this._qa = v }
	private _qa = []
	get done() { return this._done }
	set done(v) { this._done = v }
	private _done = []
	private _photoURL = 'https:\/\/lh3.googleusercontent.com\/-XdUIqdMkCWA\/AAAAAAAAAAI\/AAAAAAAAAAA\/4252rscbv5M\/photo.jpg'
	states: Array<'todo'|'inprogress'|'qa'|'done'> = ['todo', 'inprogress', 'qa', 'done']
	tasks = [
		{ uid: Date.now(), title: 'task title 1', poster: {displayName: 'z',photoURL: this._photoURL}, state: 'todo', assignedTo: ['a','b'], labels: ['frontend', 'backend', 'table', 'search feature'] },
		{ uid: Date.now(), title: 'task title 2', poster: {displayName: 'z',photoURL: this._photoURL}, state: 'inprogress', assignedTo: ['a'], labels: ['frontend', 'design', 'all button rounded'] },
		{ uid: Date.now(), title: 'task title 3', poster: {displayName: 'x',photoURL: this._photoURL}, state: 'qa', assignedTo: ['a'], labels: ['backend', 'auth', 'token error'] },
		{ uid: Date.now(), title: 'task title 4', poster: {displayName: 'a',photoURL: this._photoURL}, state: 'todo', assignedTo: ['b'], labels: ['design', 'dialog', 'confirmation'] },
		{ uid: Date.now(), title: 'task title 5', poster: {displayName: 's',photoURL: this._photoURL}, state: 'done', assignedTo: ['b'], labels: ['frontend'] },
		{ uid: Date.now(), title: 'task title 6', poster: {displayName: 'v',photoURL: this._photoURL}, state: 'done', assignedTo: ['b'], labels: ['rusman', 'tampan', 'berani'] },
		{ uid: Date.now(), title: 'task title 7', poster: {displayName: 'z',photoURL: this._photoURL}, state: 'qa', assignedTo: ['b'], labels: ['sabar'] },
	]
	constructor() {
		this.tasks.forEach(task => {
			this[task.state].push(task)
		})
	}
	drop(event: CdkDragDrop<any[]>) {
		console.log(event.previousIndex, event.currentIndex)
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}
	ngAfterViewInit() {
		console.log(this.cdl)
		const cdl = this.cdl.toArray()
		cdl.forEach(_cdl => {
			_cdl.connectedTo = cdl
		})
		console.log(this.cdl.toArray())
	}
}
