import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core'

import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop'

let COUNTER = 1

@Component({
	selector: 'app-multiple-select',
	templateUrl: './multiple-select.component.html',
	styles: [`
	.example-container {
		min-width: 150px;
		margin: 0 25px 25px 0;
		display: inline-block;
		vertical-align: top;
	}

	.example-list {
		border: solid 1px #ccc;
		min-height: 60px;
		max-height: 300px;
		background: white;
		border-radius: 4px;
		overflow: hidden;
		display: block;
	}

	.example-box {
		padding: 20px 10px;
		border-bottom: solid 1px #ccc;
		color: rgba(0, 0, 0, 0.87);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		cursor: move;
		background: white;
		font-size: 14px;
	}

	.cdk-drag-preview {
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
		0 8px 10px 1px rgba(0, 0, 0, 0.14),
		0 3px 14px 2px rgba(0, 0, 0, 0.12);
	}

	.cdk-drag-placeholder {
		opacity: 0;
	}

	.cdk-drag-animating {
		transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
	}

	.example-box:last-child {
		border: none;
	}

	.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
		transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
	}
	`]
})
export class MultipleSelectComponent implements OnInit {
	@Input() unselectedText: string = ''
	@Input() selectedText: string = ''
	@Input()
	get data(): Data[] {
		return [...this._unselectedData.map(d => {
			d.selected = false
			return d
		}), ...this._selectedData.map(d => {
			d.selected = true
			return d
		})]
	}
	set data(v) {
		const data = v.slice()
		this._data = data
		this._unselectedData = data.filter(d => !d.selected)
		this._selectedData = data.filter(d => d.selected)
	}
	private _data: Data[] = []
	get unselectedData() {
		const term = this.filterDataset.nativeElement.value
		if (term) {
			return this._unselectedData.filter(d => d.label.indexOf(term) !== -1)
		}
		return this._unselectedData
	}
	set unselectedData(d: Data[]) {
		this._unselectedData = d.map(d => {
			d.selected = false
			return d
		})
	}
	private _unselectedData: Data[] = []
	@ViewChild('filterDatasetRef') filterDataset: ElementRef<HTMLInputElement>
	@ViewChild('filterSelectedDataRef') filterSelectedData: ElementRef<HTMLInputElement>
	get selectedData() {
		const term = this.filterSelectedData.nativeElement.value
		if (term) {
			return this._selectedData.filter(v => v.label.indexOf(term) !== -1)
		}
		return this._selectedData
	}
	set selectedData(d: Data[]) {
		this._selectedData = d.map(d => {
			d.selected = false
			return d
		})
	}
	private _selectedData: Data[] = []

	callback: (e: CdkDragDrop<string[]>) => void = () => {}
	counter = COUNTER++
	constructor() {}
	ngOnInit() {}
	drop(e: CdkDragDrop<string[]>) {
		// this.log('container', e.container)
		// this.log('currentIndex', e.currentIndex)
		// this.log('item', e.item)
		// this.log('previousContainer', e.previousContainer)
		// this.log('previousIndex', e.previousIndex)
		if (e.previousContainer === e.container) {
			console.log('move')
			moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
		} else {
			console.log('transfer')
			transferArrayItem(e.previousContainer.data,
				e.container.data,
				e.previousIndex,
				e.currentIndex);
		}
		this.callback(e)
	}
	log(g, o: {}) {
		console.group(g)
		for (let k in o) {
			console.log(k, o[k])
		}
		console.groupEnd()
	}
	mark_fuzzy_match(text: string, search: string) {
		search = search.replace(/\ /g, '').toLowerCase();
		let tokens = [];
		let searchPosition = 0;
		for (let n=0; n<text.length; n++) {
			let text_char = text[n];
			if(searchPosition < search.length && text_char.toLowerCase() == search[searchPosition]) {
				text_char = '<b>' + text_char + '</b>';
				searchPosition += 1;
			}
			tokens.push(text_char);
		}
		if (searchPosition != search.length) {
			return '';
		}
		return tokens.join('');
	}
	fuzzySearch(text: string, search: string) {
		search = search.replace(/\ /g, '').toLowerCase();
		let tokens = [];
		let searchPosition = 0;
		for (let n=0; n<text.length; n++) {
			let text_char = text[n];
			if (searchPosition < search.length && text_char.toLowerCase() == search[searchPosition]) {
				text_char = '😎';
				searchPosition += 1;
			}
			tokens.push(text_char);
		}
		if (searchPosition != search.length) {
			return '';
		}
		let abc = tokens.reduce((a,c) => c=='😎' ? a+1 : a+0,0)
		return abc
	}
}

export interface Data {
	id			: string
	icon		?: string
	label		: string
	selected	?: boolean
}
