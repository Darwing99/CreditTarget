import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TargetCredit';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: 'app-list-target',
  templateUrl: './list-target.component.html',
  styleUrls: ['./list-target.component.css'],
})
export class ListTargetComponent implements OnInit {
  listTarget: TarjetaCredito[] = [];

  constructor(
    private targetservice: TargetService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.getTarget();
  } 
  getTarget() {
    
    this.targetservice.obtenerTarjetas().subscribe((doc) => {
      this.listTarget = [];
      doc.forEach((element: any) => {
        this.listTarget.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
   
  }
  deleteTarget(id: any) {
    this.targetservice.eliminarTarjeta(id).then(() => {
      this.toastr.success('Tarjeta Eliminada');
      
    });
  }
  editTarget(tarjeta: TarjetaCredito) {
    this.targetservice.addTargetEdit(tarjeta);
   
  }
}
