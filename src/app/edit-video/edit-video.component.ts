import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.updateVideoData();
    const id= this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetVideo(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)
    })
  }

  get title(){
    return this.editForm.get('title');
  }

  get author() {
    return this.editForm.get('author');
  }

  get genre(){
    return this.editForm.get('genre');
  }

  get year(){
    return this.editForm.get('year');
  }

  updateVideoData(){
    this.editForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(3)]],
      author:['', [Validators.required]],
      genre:['', [Validators.required]],
      year:['', [Validators.required]]
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudApi.UpdateVideo(this.editForm.value);       // Update video data using CRUD API
    this.toastr.success(this.editForm.controls['title'].value + ' updated successfully');   
    this.router.navigate(['view-videos']);               
  }
}
