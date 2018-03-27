import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSlideToggleChange, MatSort, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../common/dialog.component';
import {FieldDialogComponent} from '../common/field.dialog.component';


@Component({
  selector: 'app-cabinet-comp',
  template: `
    <div>
      <div class="mat-elevation-z8">
        <mat-table #table [dataSource]="dataSource" matSort>

          <!-- Group Column -->
          <ng-container matColumnDef="group">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Группа</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.group}}</mat-cell>
          </ng-container>
          <!-- Last Name Column -->
          <ng-container matColumnDef="lastName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Фамилия</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.lastName}}</mat-cell>
          </ng-container>
          <!-- First Name Column -->
          <ng-container matColumnDef="firstName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Имя</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.firstName}}</mat-cell>
          </ng-container>
          <!-- Middle Name Column -->
          <ng-container matColumnDef="middleName">
            <mat-header-cell *matHeaderCellDef> Отчество</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.middleName}}</mat-cell>
          </ng-container>
          <!-- Reason Column -->
          <ng-container matColumnDef="reason">
            <mat-header-cell *matHeaderCellDef> Причина</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.reason}}</mat-cell>
          </ng-container>
          <!-- Sum Column -->
          <ng-container matColumnDef="sum">
            <mat-header-cell *matHeaderCellDef> Сумма</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.sum}}</mat-cell>
          </ng-container>
          <!-- Action Column-->
          <ng-container matColumnDef="action">
            <mat-header-cell *matHeaderCellDef>
              <mat-slide-toggle (change)="enableAction($event)">Действие</mat-slide-toggle>
            </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <i class="material-icons" (click)="confirm(element.id)">done</i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i class="material-icons" (click)="decline(element.id)">clear</i>
            </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>

        <mat-paginator #paginator
                       [pageSize]="10"
                       [pageSizeOptions]="[5, 10, 20]"
                       [showFirstLastButtons]="true">
        </mat-paginator>
      </div>
    </div>`,
  styles: [`.example-container {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.mat-table {
  overflow: auto;
  max-height: 500px;
}`]
})



export class AppCabinetComponent implements OnInit{

  displayedColumns = ['group', 'lastName', 'firstName', 'middleName', 'sum', 'reason', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private active = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  enableAction(event: MatSlideToggleChange) {
    this.active = event.checked;
  }

  checkActive(): boolean{
    if (!this.active) {
      this.openDialog('Переведите переключатель\'Действие\' чтобы подтверждать/отклонять заявления');
    }
    return this.active;
  }

  confirm(id: number) {
    if (!this.checkActive()){
      return;
    }
    // TODO
  }

  decline(id: number) {
    if (!this.checkActive()){
      return;
    }
    this.openDeclineDialog(id, 'Укажите причину отказа');
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: message
    });
  }

  openDeclineDialog(id: number, message: string): void {
    const dialogRef = this.dialog.open(FieldDialogComponent, {
      width: '300px',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       // TODO
    });
  }

}

export interface Element {
  id: number;
  group: number;
  firstName: string;
  lastName: string;
  middleName: string;
  sum: number;
  reason: string;
}
const ELEMENT_DATA: Element[] = [
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
  {id: 1, group: 517, firstName: 'Александр', middleName: 'Сергеевич', lastName: 'Зубков', reason: 'Просто дайте мне мои деньги, я хочу купить себе много всякой фигни', sum: 100500},
];
