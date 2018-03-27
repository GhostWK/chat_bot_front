import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  template: `
    {{data}}
    <div mat-dialog-actions>
    <button mat-button (click)="close()">Ok</button>
    </div>
  `,
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  close(): void {
    this.dialogRef.close();
  }

}
