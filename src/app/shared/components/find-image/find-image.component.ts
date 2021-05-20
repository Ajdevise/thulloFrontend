import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnsplashService } from '../../services/unsplash.service';

@Component({
  selector: 'app-find-image',
  templateUrl: './find-image.component.html',
  styleUrls: ['./find-image.component.scss']
})
export class FindImageComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<string>();
  currentPage: number = 1;
  searchForm: FormGroup;
  images: Array<object>;
  loading: boolean = true;

  constructor(private unsplashService: UnsplashService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.minLength(2)])
    })
    this.searchByQuery();
    console.log("Initted");
  }

  searchByQuery(clicked: boolean = false) {
    if(clicked) this.currentPage = 1;
    this.loading = true;
    this.unsplashService.getImages(this.searchForm.value['query'], this.currentPage).subscribe(result => {
      this.loading = false;
      this.images = result.response.results;
    })
  }

  prevPage() {
    this.currentPage--;
    this.searchByQuery();
  }

  nextPage() {
    this.currentPage++;
    this.searchByQuery();
  }
  
  imageClicked(url: string) {
    this.imageSelected.emit(url);
  }
}
