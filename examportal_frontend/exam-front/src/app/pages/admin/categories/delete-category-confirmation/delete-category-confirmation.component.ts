import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-confirmation',
  templateUrl: './delete-category-confirmation.component.html',
  styles: [
  ]
})
export class DeleteCategoryConfirmationComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<DeleteCategoryConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  confirmDeleteFunc() {
    this.dialogRef.close(true);
  }

}
