import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { read, utils } from 'xlsx';





@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.css'
})
export class UploadExcel {
  chiavi: any[] = [];
  valori: any[] = [];

  csvImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;
          if (sheets.length) {
            const sheetName = sheets[0];
            const rows = utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
  
            // Le chiavi sono le intestazioni (prima riga)
            //@ts-ignore
            this.chiavi = rows[0];
            // I valori sono le righe successive
            this.valori = rows.slice(1); // Qui `slice(1)` esclude la prima riga delle intestazioni
  
            console.log(this.chiavi); // Stampa le chiavi
            console.log(this.valori); // Stampa i valori (array di righe)
          }
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  
}