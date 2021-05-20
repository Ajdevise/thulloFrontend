import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private BASE_URL = "http://localhost:3000/api/boards";

  constructor(private http: HttpClient) { }

  createBoard(boardData: Board) {
    this.http.post(this.BASE_URL, boardData).subscribe(res => {
      console.log("successfully created board!");
    }, err => {
      console.log("something went wrong", err);
    });
  }

  getBoardsOfActiveUser(): Observable<{ boards: Array<Board> }> {
    return this.http.get<{ boards: Array<Board> }>(this.BASE_URL);
  }
}
