import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	Renderer2,
	TemplateRef,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
} from '@angular/forms'
import {
	MatCheckbox,
	MatColumnDef,
	MatDialog,
	MatDialogRef,
	MatFooterRowDef,
	MatHeaderRowDef,
	MatPaginator,
	MatRowDef,
	MatSnackBar,
	MatSort,
	MatProgressSpinner,
	MatTable,
	MatTableDataSource,
} from '@angular/material'
import {
	DomSanitizer,
} from '@angular/platform-browser'
import {
	ActivatedRoute,
	Router,
} from '@angular/router'

import {
	Observable,
	fromEvent,
} from 'rxjs'
import {
	debounceTime,
	distinctUntilChanged,
} from 'rxjs/operators'

import { ApiService } from '../s/api.service'
import { MultipleSelectComponent } from '../multiple-select'

@Component({
	selector: 'app-datatable',
	templateUrl: './datatable.component.html',
	styles: [`
		:host {
			max-width: 100vw;
			overflow: scroll;
			width: 100vw;
		}
	`]
})
export class DatatableComponent<T={id:string}> implements AfterViewInit, AfterContentInit, OnDestroy, OnInit {
	@Input() extraMainMenus: Menu[] = []
	@Input() extraRowMenus: Menu[] = []

	@Input() id: string = '_id'
	@Input() col: string
	@Input() showCreateMenu: boolean = true
	@Input() showDeleteMenu: boolean = true
	@Input() showEditMenu: boolean = true
	@Input() showRefreshMenu: boolean = true
	@Input() showPrintAllMenu: boolean = true
	@Input() showMainMenuTrigger: boolean = true
	@Input() showRowMenuTrigger: boolean = true
	@Input() titleText: string

	@Input() create			: Function = () => console.log('create')
	@Input() deleteById		: Function = (row) => {
		const deleteByIdDialog = this._dialog.open(this.deleteByIdTemplateRef, {
			data: {
				...row,
				_delete: () => {
					deleteByIdDialog.close()
					this._api.deleteById(this.col, row.uid)
						.subscribe(res => {
							this._dialog.open(this.deleteByIdSuccessTemplateRef, {
								data: {
									id: row.uid
								}
							})
						}, error => {
							this._dialog.open(this.httpResponseErrorTemplateRef, {
								data: {
									error,
									title: 'Gagal menghapus data '+row.uid
								}
							})
						})
				}
			}
		})
	}
	@Input() deleteFiltered	: Function = () => console.log('deleteFiltered')
	@Input() deleteSelected	: Function = () => console.log('deleteSelected')
	@Input() editById		: Function = (row) => console.log('editById')
	@Input() filterColumn	: Function = () => {
		this.multipleSelectComponentDialogRef = this._dialog.open(MultipleSelectComponent)
		let multipleSelect = this.multipleSelectComponentDialogRef.componentInstance
		multipleSelect.unselectedText = 'Sembunyikan'
		multipleSelect.selectedText = 'Tampilkan'
		multipleSelect.data = this.columns.map(col => {
			return {
				id: col.id,
				icon: col.icon,
				label: col.label,
				selected: !col.hidden
			}
		})
		multipleSelect.callback = (e) => {
			this.columns = multipleSelect.data.map(d => {
				return {
					id: d.id,
					icon: d.icon,
					label: d.label,
					hidden: !d.selected
				}
			})
		}
		this.multipleSelectComponentDialogRef.afterClosed().subscribe(_ => this.multipleSelectComponentDialogRef = multipleSelect = undefined)
	}
	@Input() printAll		: Function = () => console.log('printAll')
	@Input() printById		: Function = (row) => console.log('printById')
	@Input() printFiltered	: Function = () => console.log('printFiltered')
	@Input() printPerPeriod	: Function = () => console.log('printperPeriod')
	@Input() printSelected	: Function = () => console.log('printSelected')
	@Input() rowClick		: Function = (row) => console.log('rowClick')
	@Input() refresh		: Function = () => {
		this.setData()
	}

	@Input()
	get columns() { return this._columns }
	set columns(columns: Column[]) {
		this._columns = columns
		const controlName = {}
		columns.forEach(c => {
			controlName[c.id] = ''
		})
		// console.log('controlName', controlName)
		this.form = this._fb.group({
			...controlName
		})
		// console.log('form', this.form)
	}
	private _columns: Column[] = []
	@Input()
	get data() {
		return this.dataSource.data.slice()
	}
	set data(v: T[]) {
		this.dataSource.data = v
	}

	@ViewChild('caseSensitiveRef') caseSensitiveRef: MatCheckbox
	@ViewChild('deleteByIdTemplateRef') deleteByIdTemplateRef: TemplateRef<any>
	@ViewChild('deleteByIdSuccessTemplateRef') deleteByIdSuccessTemplateRef: TemplateRef<any>
	@ViewChild('httpResponseErrorTemplateRef') httpResponseErrorTemplateRef: TemplateRef<any>
	@ViewChild(MatPaginator) paginatorRef: MatPaginator
	@ViewChild(MatSort) sortRef: MatSort
	@ViewChild(MatTable) tableRef: MatTable<T>

	get displayedColumns() {
		let columns = [
			{ id: '_index', label: 'No', hidden: false },
			...this.columns.filter(c => !c.hidden),
			{ id: '_actions', label: '', hidden: false },
		]
		return columns
	}
	get displayedColumnsId() {
		return this.displayedColumns.map(c => c.id)
	}
	get displayedColumnsSearch() {
		return this.displayedColumns.map(v => {
			return {
				...v,
				id: v.id+'_search'
			}
		}).filter(v => v.id != '_index')
	}
	get displayedColumnsIdSearch() {
		return this.displayedColumnsSearch.map(c => c.id)
	}
	private _isLoading: boolean = true
	dataSource = new MatTableDataSource<T>([])
	filterCaseSensitive = false
	form: FormGroup
	multipleSelectComponentDialogRef: MatDialogRef<MultipleSelectComponent>

	constructor(
		public sanitizer: DomSanitizer,
		private _api: ApiService,
		private _dialog: MatDialog,
		private _fb: FormBuilder,
		// private _renderer: Renderer2,
		private _snackBar: MatSnackBar,
	) {}
	ngAfterViewInit() {
		this.dataSource!.paginator = this.paginatorRef
		this.dataSource.sort = this.sortRef
		this.caseSensitiveRef.change.subscribe(v => {
			this.filterCaseSensitive = v.checked
			this.paginatorRef.pageIndex = 0
			this.dataSource.filter = this.dataSource.filter
		})
	}
	ngAfterContentInit() {}
	ngOnDestroy() {}
	ngOnInit() {
		this.form.valueChanges.subscribe(v => {
			this.paginatorRef.pageIndex = 0
			this.dataSource.filter = v
		})
		this.dataSource.filterPredicate = (col: T, filter) => {
			return Object.keys(col)
				.map(k => {
					const search = filter[k]
					const str = (col[k] == null ? '' : col[k]).toString()
					if (this.filterCaseSensitive) {
						return str.indexOf(search) !== -1
					}
					console.log(str, search, Math.random())
					return str.toLowerCase().indexOf((search == null ? '' : search).toString().toLowerCase()) !== -1
				})
				.every(v => v)
		}
		this.setData()
	}
	setData(params = {}, errorTitle = 'Gagal mengambil data') {
		this._api.col(this.col)
			.valueChanges()
			.subscribe((res: any) => {
				console.log(res)
				this.dataSource.data = res
				this._snackBar.open('Berhasil mengambil data')._dismissAfter(4000)
			}, error => {
				this._dialog.open(this.httpResponseErrorTemplateRef, {
					data: {
						error,
						title: errorTitle
					}
				})
			})
	}
}

export interface Column {
	id		: string
	icon	?: string
	label	?: string
	hidden	?: boolean
}
export interface Menu {
	icon		: string
	label		: string
	action		: Function
}
