import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { read, utils } from 'xlsx';
import { ServiceTasksService } from '../../servizi/service-tasks.service';
import { ActivitiesServicesService } from '../../servizi/activities-services.service';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'] // Corretto da "styleUrl" a "styleUrls"
})
export class UploadExcel {
  
  constructor(private tasks: ServiceTasksService, private activities: ActivitiesServicesService) {}
  chiavi: any[] = [];
  valori: any[] = [];

  @Output() evento = new EventEmitter<string>()


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

            this.valori.forEach((element: any) => {
              let obj: { [key: string]: any } = {};
              this.chiavi.forEach((chiave, index) => {
                let valore = element[index];
                // Converti startTime e endTime da numero decimale a oggetto Date
                if (chiave.toLowerCase() === 'starttime' || chiave.toLowerCase() === 'endtime') {
                  valore = this.convertToDate(valore);
                }
                obj[chiave] = valore;
              });

              // Ora effettua la chiamata al servizio per ogni oggetto
              //@ts-ignore
              this.tasks.getSingleTaskByName(obj.taskName).subscribe({
                next: value => {
                   //@ts-ignore
                  console.log(obj)
                  //@ts-ignore
                  obj['taskID'] = value.data.document[0]._id;
                  console.log(obj);
                  //@ts-ignore
                  this.activities.createActivity(obj).subscribe({
                    next: value => {
                      if(value.status == 'success'){
                        this.evento.emit("Evento inviato")
                      }
                    }
                  })
                },
              });
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  convertToDate(decimalTime: number): Date {
    // Converti il numero decimale in ore e minuti
    const hours = Math.floor(decimalTime * 24);
    const minutes = Math.round((decimalTime * 24 * 60) % 60);
    // Crea un oggetto Date impostando solo le ore e i minuti
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Imposta ore, minuti, secondi e millisecondi
    return date;
  }
}

