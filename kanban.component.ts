import { Component, Input, Output, EventEmitter, ViewChild, ElementRef,DoCheck } from '@angular/core';
import { ColumnService } from '@services';
@Component({
	selector: 'kanban',
	templateUrl: './kanban.component.html',
	styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements DoCheck {
	constructor(public cs: ColumnService) {}
	// Kanban management
	ngDoCheck(){
		if(!this.board || !this.cs.board[this.board] || !this.cs.board[this.board].length) return;
		if(!this.cs.board[this.board]) this.cs.board[this.board] = [];
		for (let i = 0; i < this.cs.board[this.board].length; i++){
		    if(!this.tasks_in[this.cs.board[this.board][i]._id]){
		    	this.tasks_in[this.cs.board[this.board][i]._id] = []
		    }
		}
		for (let i = 0; i < this.tasks.length; i++){
		    if(!this.tasks[i].column || !this.tasks_in[this.tasks[i].column]){
		    	this.tasks[i].column = this.cs.board[this.board][0]._id;
		    	this.update_task.emit(this.tasks[i]);
		    }
		    if(this.tasks_in[this.tasks[i].column].find(task=>task._id===this.tasks[i]._id)){
		    	continue;
		    }
		    this.tasks_in[this.tasks[i].column].push(this.tasks[i]);
		    this.tasks_in[this.tasks[i].column].sort((a,b)=>{
		    	if(!a.order) return -1;
		    	if(!b.order) return 1;
		    	if(a.order < b.order) return -1;
		    	return 1;
		    });
		}
	}
	@Input('board') board:string = '';
	@Input('tasks') tasks:any = [];
	public tasks_in:any = {}
	@Input('columns') columns:any = [];
	get clmns(){
		if(this.board) return this.cs.board[this.board];
		else return this.columns;
	}
	public new_task:any = {};
	// Tasks management
	@Input('label_task') label_task:string = 'name';
	@Output() create_task = new EventEmitter();
	@Output() open_task = new EventEmitter();
	@Output() update_task = new EventEmitter();
	@Output() delete_task = new EventEmitter();
	update(task, column, order){
		let update = false;
		if(task.column !== column){
			update = true;
			task.column = column;
		}
		if(task.order !== order){
			update = true;
			task.order = order;
		}
		if(update) this.update_task.emit(task);
	}
	on_move(column, arr){
		if(this.board){
			this.tasks_in[column._id] = arr;
		} else {
			column.rows = arr;
		}
		for (let i = 0; i < this.clmns.length; i++){
			if(this.board){
				for (let j = 0; j < this.tasks_in[this.clmns[i]._id].length; j++){
					this.update(this.tasks_in[this.clmns[i]._id][j], this.clmns[i]._id, j);
				}
			}else{
				for (let j = 0; j < this.clmns[i].rows.length; j++){
					this.update(this.clmns[i].rows[j], this.clmns[i].name, j);
				}
				
			}
		}
	}
	// Columns management
	public show_create_column = false;
	public name_create_column = '';
	@ViewChild('el_create_column', {static: false}) el_create_column: ElementRef;
	focus_create_column(){
		if(!this.el_create_column) return setTimeout(this.focus_create_column.bind(this), 100);
		this.el_create_column.nativeElement.focus();
	}
	create_column(){
		this.cs.create({
			name: this.name_create_column,
			board: this.board
		});
		this.name_create_column = '';
		this.show_create_column = false;
	}
}
