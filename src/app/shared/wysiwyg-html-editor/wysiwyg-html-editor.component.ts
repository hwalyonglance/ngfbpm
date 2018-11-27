import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';

import {
	A, B, C, D, E, F, G, H, I, J, K, L, M,
	N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
	ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX,
	SEVEN, EIGHT, NINE, OPEN_SQUARE_BRACKET,
	CLOSE_SQUARE_BRACKET,
} from '@angular/cdk/keycodes'

let COUNTER = 1

@Component({
	selector: 'app-wysiwyg-html-editor',
	templateUrl: './wysiwyg-html-editor.component.html',
	styles: [`
		.wysiwyg-html-editor-frame {
			min-height: 250px;
			max-height: 1250px;
			width: 100%;
		}
	`]
})
export class WysiwygHtmlEditorComponent implements AfterViewInit, OnInit {
	@Input()
	get rawHTML() {
		return this.editor.nativeElement.innerHTML
	}
	set rawHTML(v) {
		this._rawHTML = this.editor.nativeElement.innerHTML = v
	}
	private _rawHTML: string = ''
	@ViewChild('editor') editor: ElementRef<HTMLIFrameElement>;
	counter = COUNTER++
	isEditMode = true;
	isRawMode = false;
	constructor() { }
	ngOnInit() {}
	ngAfterViewInit() {
		// console.log(this.editor);
		this.enableEditMode()
	}
	// @HostListener('keydown')
	keydownListener(e: KeyboardEvent) {
		e.preventDefault()
		let commandId: string, showUI: boolean, args: Array<number|string>
		if (e.ctrlKey) {
			switch (e.keyCode) {
				case Z: commandId = 'undo'; break;
				case Y: commandId = 'redo'; break;
				case B: commandId = 'bold'; break;
				case I: commandId = 'italic'; break;
				case U: commandId = 'underline'; break;
				case K: commandId = 'insertLink'; break;
				case SEVEN: commandId = 'insertOrderedList'; break;
				case EIGHT: commandId = 'insertUnorderedList'; break;
				case OPEN_SQUARE_BRACKET: commandId = 'outdent'; break;
				case CLOSE_SQUARE_BRACKET: commandId = 'indent'; break;
			}
			if (e.altKey) {
				switch (e.keyCode) {
					case I: commandId = ''; break;
				}
			}
			if (e.shiftKey) {
				switch (e.keyCode) {
					case L: commandId = 'justifyLeft'; break;
					case E: commandId = 'justifyCenter'; break;
					case R: commandId = 'justifyRight'; break;
					case J: commandId = 'justifyFull'; break;
				}
			}
		}
	}
	enableEditMode() {
		this.editor.nativeElement.contentDocument.designMode = 'On';
	}
	execCommand(command: string, arg?: string) {
		this.editor.nativeElement.contentDocument.execCommand(command, false, arg)
	}
	toggleEditMode() {
		if (this.isEditMode) {
			this.editor.nativeElement.contentDocument.designMode = 'Off'
		} else {
			this.enableEditMode()
		}
		this.isEditMode = !this.isEditMode
	}
	toggleSource() {
		const body = this.editor.nativeElement.contentDocument.getElementsByTagName('body')[0];
		if (this.isRawMode) {
			body.innerHTML = body.textContent;
		} else {
			body.textContent = body.innerHTML;
		}
		this.isRawMode = !this.isRawMode
	}
}
