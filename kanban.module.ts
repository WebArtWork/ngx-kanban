import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DragScrollModule } from 'ngx-drag-scroll';
import { DragulaModule } from 'ng2-dragula';
import { KanbanComponent } from './kanban.component';
import { CreateComponent } from './card/create/create.component';
import { WacomModule } from 'wacom';
@NgModule({
	imports: [
		DragulaModule.forRoot(),
		DragScrollModule,
		CommonModule,
		WacomModule,
		FormsModule
	],
	declarations: [
		KanbanComponent,
		CreateComponent
	],
	exports: [
		KanbanComponent
	],
	providers: []

})
export class KanbanModule { }
