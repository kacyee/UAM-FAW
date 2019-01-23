import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVideoComponent } from './add-video/add-video.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
const routes: Routes = [
  { path:'', redirectTo:'/register-video',pathMatch:'full'},
  { path:'register-video', component: AddVideoComponent },
  { path:'view-videos', component: VideosListComponent },
  { path:'edit-video/:id', component: EditVideoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
