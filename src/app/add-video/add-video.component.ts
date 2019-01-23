import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  public videozForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    this.crudApi.GetVideosList();
    this.videForm();
  }

  videForm(){
    this.videozForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(3)]],
      author:['', [Validators.required]],
      genre:['', [Validators.required]],
      year:['', [Validators.required]]
    })
  }

  //Accesing form control

  get title(){
    return this.videozForm.get('title');
  }

  get author(){
    return this.videozForm.get('author');
  }

  get genre(){
    return this.videozForm.get('genre');
  }

  get year(){
    return this.videozForm.get('genre');
  }

  ResetForm(){
    this.videozForm.reset();
  }

  submitVideoData() {
    this.crudApi.AddVideo(this.videozForm.value);
    this.toastr.success(this.videozForm.controls['title'].value + 'Added');
    this.router.navigate(['view-videos']);
  };
  
}
