
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from './interfaces/photo';
import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardmodule } from './photo-board.module';
import { buildPhotoList } from './test/build-photo-list';

describe(PhotoBoardComponent.name + ' outros', () => {
  let fixture: ComponentFixture<PhotoBoardTestComponent>;
  let component: PhotoBoardTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoBoardTestComponent],
      imports: [PhotoBoardmodule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardTestComponent);
    component = fixture.componentInstance;
  });

  it(`Should display rows and columns when (@Input photos) has value`, () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();

    expect(component.board.rows.length)
      .withContext('Number of rows')
      .toBe(2);
    expect(component.board.rows[0].length)
      .withContext('Number of columns from the first row')
      .toBe(4);
    expect(component.board.rows[1].length)
      .withContext('Number of columns from the second row')
      .toBe(4);
  });
});

@Component({
  template: `
    <app-photo-board [photos]="photos">
    </app-photo-board>
  `
})
class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) public board: PhotoBoardComponent;
  public photos: Photo[] = [];
}
