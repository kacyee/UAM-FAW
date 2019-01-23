import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Video } from './../shared/video';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {
    p: number = 1;                      
    Video: Video[];                 
    hideWhenNoVideo: boolean = false; 
    noData: boolean = false;            
    preLoader: boolean = true;          
    
  
    constructor(
      public crudApi: CrudService, 
      public toastr: ToastrService 
      ){ }
  
  
    ngOnInit() {
      this.dataState(); 
      let s = this.crudApi.GetVideosList(); 
      s.snapshotChanges().subscribe(data => { 
        this.Video = [];
        data.forEach(item => {
          let a = item.payload.toJSON(); 
          a['$key'] = item.key;
          this.Video.push(a as Video);
        })
      })
    }
  
 
    dataState() {     
      this.crudApi.GetVideosList().valueChanges().subscribe(data => {
        this.preLoader = false;
        if(data.length <= 0){
          this.hideWhenNoVideo = false;
          this.noData = true;
        } else {
          this.hideWhenNoVideo = true;
          this.noData = false;
        }
      })
    }
  
   
    deleteVideo(video) {
      if (window.confirm('Are sure you want to delete this video ?')) { 
        this.crudApi.DeleteVideo(video.$key);
        this.toastr.success(video.title + ' successfully deleted!'); 
      }
    }
  
  }
