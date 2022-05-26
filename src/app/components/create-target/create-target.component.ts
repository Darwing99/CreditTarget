import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TargetCredit';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: 'app-create-target',
  templateUrl: './create-target.component.html',
  styleUrls: ['./create-target.component.css'],
})
export class CreateTargetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo = 'Crear Tarjeta ';
  button = 'Guardar';
  id: string | undefined;
  constructor(
    private fb: FormBuilder,
    private _tarjeta: TargetService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', [Validators.required]],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this._tarjeta.getTargetEdit().subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Tarjeta';
      this.button = 'Actualizar';
      this.form.patchValue({
        id: data.id,
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        fechaCreacion: data.fechaCreacion,
        fechaActualizacion: data.fechaActualizacion,
        cvv: data.cvv,
      });
    });
  }
  saveTarget() {
    if (this.id === undefined) {
      this.createTarget();
    } else {
      this.updateTarget(this.id);
    }
  }
  showSuccess() {
    this.toastr.success('Notificacion!', 'Tarjeta Guardada!');
  }
  showWarning() {
    this.toastr.warning('Error al guardar', 'Advertencia');
  }
  updateTarget(id: string) {
    const TarjetaCredito: any = {
      numeroTarjeta: this.form.value.numeroTarjeta,
      titular: this.form.value.titular,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._tarjeta
      .editTarget(id, TarjetaCredito)
      .then(() => {
        this.loading = false;
        this.showSuccess();
        this.form.reset();
        this.button = 'Guardar';
        this.id = undefined;
        this.titulo = 'Crear nueva tarjeta';
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
  createTarget() {

    const TarjetaCredito: TarjetaCredito = {
      numeroTarjeta: this.form.value.numeroTarjeta,
      titular: this.form.value.titular,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._tarjeta
      .guardarTarjeta(TarjetaCredito)
      .then(
        () => {
          this.loading = false;
          this.showSuccess();
        },
        (error) => {
          this.loading = false;
          this.showWarning();
        }
      )
      .catch(() => {
        this.loading = false;
        this.showWarning();
      });
    this.form.reset();
  }
}
