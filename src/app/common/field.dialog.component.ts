import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-field-dialog',
  template: `
    {{data}}
    <mat-form-field>
      <input matInput [(ngModel)]="field">
    </mat-form-field>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Отмена</button>
      <button mat-button [mat-dialog-close]="field" cdkFocusInitial>Подтвердить</button>
    </div>
  `,
})
export class FieldDialogComponent {

  field: string;

  constructor(
    public dialogRef: MatDialogRef<FieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
