import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/shared/models/board.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BoardService } from 'src/app/shared/services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: Array<Board>;
  coverImage: string;
  visibility: "private" | "public" = "private";
  isVisibilityMenuActive: boolean = false;
  isImageSelectionMenuActive: boolean = false;
  isModalActive: boolean = false;
  createBoardForm: FormGroup;
  modalError: boolean = false;

  constructor(private boardsService: BoardService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
    })

    this.boardsService.getBoardsOfActiveUser().subscribe(res => {
      this.boards = res.boards;
    })
  }

  openModal() {
    this.isModalActive = true;
  }

  closeModal() {
    this.isModalActive = false;
  }

  toggleImageSelectionMenu() {
    this.isImageSelectionMenuActive = !this.isImageSelectionMenuActive;
  }

  deactivateImageSelectionMenu() {
    this.isImageSelectionMenuActive = false;
  }

  toggleVisibilityMenu() {
    this.isVisibilityMenuActive = !this.isVisibilityMenuActive
  }

  deactivateVisibilityMenu() {
    this.isVisibilityMenuActive = false;
  }

  setCoverImage(url: string) {
    this.coverImage = url;
    this.isImageSelectionMenuActive = false;
  }

  setVisibility(visibilityType: "public" | "private") {
    this.visibility = visibilityType;
    this.isVisibilityMenuActive = false;
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  onCreateBoard() {
    let title = this.createBoardForm.value["title"];
    if(!title || !this.coverImage) {
      this.modalError = true;
      return;
    }

    let owner = this.authService.getUserData();

    const board = {
      title,
      cover: this.coverImage,
      visibility: this.visibility,
      owner: owner,
      members: [owner]
    }

    this.boards.push(board);
    this.boardsService.createBoard(board);
    this.isModalActive = false;
  }
}
