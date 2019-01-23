import { Injectable } from '@angular/core';
import { Video } from '../shared/video';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  videosRef: AngularFireList<any>;
  videoRef: AngularFireObject<any>;
  constructor(private db:AngularFireDatabase) { }

  AddVideo(video: Video){
    this.videosRef.push({
      title:video.title,
      author:video.author,
      year:video.year,
      genre:video.genre
    })
  }

  // Fetch single video
  GetVideo(id: string){
    this.videoRef = this.db.object('videos-list/' + id);
    return this.videoRef;
  }

  // fetch video List
  GetVideosList(){
    this.videosRef = this.db.list('videos-list');
    return this.videosRef;
  }

  // Update Video Object
  UpdateVideo(video: Video){
    this.videoRef.update({
      title:video.title,
      author:video.author,
      year:video.year,
      genre:video.genre
    })
  }

  // delete video
  DeleteVideo(id: string){
    this.videoRef = this.db.object('videos-list/'+id);
    this.videoRef.remove();
  }
}
