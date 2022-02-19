import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'card-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent{
	@Output() create_task = new EventEmitter();
	@ViewChild('el_text', {static: true}) el_text: ElementRef;
	focus(){
		if(!this.el_text) return setTimeout(this.focus.bind(this), 100);
		this.el_text.nativeElement.focus();
	}
	public create = false;
	public name = '';
	constructor() {}
}
