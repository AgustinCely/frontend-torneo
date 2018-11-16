import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule,MatSidenavModule,MatToolbarModule,MatIconModule, MatMenuModule,MatDividerModule,MatTableModule,MatPaginatorModule, MatCardModule,MatSnackBarModule,MatSortModule,MatAutocompleteModule, MatInputModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatExpansionModule, MatProgressBarModule} from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports:[
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers: []
})
export class MaterialModule { }