import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScrpitsService } from 'src/app/cargar-scrpits.service';
import { Fundacion } from 'src/app/Models/Fundacion';
import { Persona } from 'src/app/Models/Persona';
import { Usuario } from 'src/app/Models/Usuario';
import { FundacionService } from 'src/app/Services/fundacion.service';
import { FotoService } from 'src/app/Services/imagen.service';
import { PersonaService } from 'src/app/Services/persona.service';
import { UsuarioService } from 'src/app/Services/usuario.service';


@Component({
  selector: 'app-reg-fundacion',
  templateUrl: './reg-fundacion.component.html',
  styleUrls: ['./reg-fundacion.component.css']
})
export class RegFundacionComponent implements OnInit {


  //VALIDACIONES


  // letras y espacios
  letrasEspace: RegExp = /^[a-zA-Z\sÑñáéíóúÁÉÍÓÚ]+$/;
  letrasEspaceNumbers: RegExp = /^[a-zA-Z0-9\sÑñáéíóúÁÉÍÓÚ]+$/;
  letrasEspeciales: RegExp = /^[a-zA-Z0-9\s.,&-ÑñáéíóúÁÉÍÓÚ]+$/;

  // letrasEspace: RegExp = /^[a-zA-Z0-9\s^!#$%&*]+$/;
  // letrasEspaceNumbers: RegExp = /^[a-zA-Z0-9\s^!#$%&*-]+$/;
  // Validar que no igrese Guion medio
  onKeyPress(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  //Validar Edad en el Campo de De fecha
  edad: any;
  validarEdad: boolean = false;
  //Validacion mas tarde

  calcularEdad() {
    if (this.persona && this.persona.fechaNacimiento) {
      let fechaPrueba: any = new Date(this.persona.fechaNacimiento);
      let fechaFormateada = fechaPrueba.toISOString().substr(0, 10);
      let anio = parseInt(fechaFormateada.substr(0, 4));
      console.log('fecha formateada ->' + fechaFormateada)
      console.log('año elejido ->' + anio)
      let fechaHoy: Date = new Date();
      let fechaFormateadaHoy = fechaHoy.toISOString().substr(0, 10);
      let anioA = parseInt(fechaFormateadaHoy.substr(0, 4));
      console.log('año actual ->' + anioA)
      let edad = anioA - anio;
      console.log('Edad:' + edad);
      if (edad < 18) {
        this.toastrService.error('Prohibido el registro', 'Usted es menor de edad', {
          timeOut: 3000,
        });
        this.validarEdad = false;
        console.log("dato -> " + this.validarEdad)
      } else {
        console.log('El usuario es mayor de edad');
        this.validarEdad = true;
        console.log("dato -> " + this.validarEdad)
      }
    }
  }

  //Validacion de Correo
  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  valCorreo: boolean = true;
  verfCorreo: string = '';

  validarCorreo() {
    this.valCorreo = this.expCorreo.test(this.fundacion.correo!);
    if (this.valCorreo) {
      console.log("Correo Bueno");
      // this.verfCorreo = 'form-control is-valid';
    } else {
      this.verfCorreo = 'ng-invalid ng-dirty';
      console.log("Correo malo");
    }
  }

  valCorreo2: boolean = true;
  verfCorreo2: string = '';

  validarCorreo2() {
    this.valCorreo2 = this.expCorreo.test(this.persona.correo!);
    if (this.valCorreo2) {
      console.log("Correo Bueno");
    } else {
      this.verfCorreo2 = 'ng-invalid ng-dirty';
      console.log("Correo malo");
    }
  }
  //Validacion de Campos vacios 
  ValidarCampos() {
    console.log("ya esta activo")
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('.needs-validation') as NodeListOf<HTMLFormElement>;
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', (event: Event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        });
      });
    });
  }
  //Vaidacion de Campos Vacios 
  limpiarFormulario() {
    const forms = document.querySelectorAll('.needs-validation') as NodeListOf<HTMLFormElement>;
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated');
      form.querySelectorAll('.ng-invalid, .ng-dirty').forEach((input) => {
        input.classList.remove('ng-invalid', 'ng-dirty');
      });
      form.reset();
    });
  }

  // Ver/Ocultar password
  verOcultarDos() {
    const showHidePw = document.querySelector('.togglePwVisibility1');
    if (showHidePw) {
      showHidePw.addEventListener('click', function (this: HTMLElement) {
        const passwordField = document.getElementById('password1') as HTMLInputElement;
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.classList.remove('pi-eye-slash');
          this.classList.add('pi-eye');
        } else {
          passwordField.type = 'password';
          this.classList.remove('pi-eye');
          this.classList.add('pi-eye-slash');
        }
      });
    }
  }
  
  verOcultar() {
    const showHidePw2 = document.querySelector('.togglePwVisibility2');
    if (showHidePw2) {
      showHidePw2.addEventListener('click', function (this: HTMLElement) {
        const passwordField = document.getElementById('password2') as HTMLInputElement;
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.classList.remove('pi-eye-slash');
          this.classList.add('pi-eye');
        } else {
          passwordField.type = 'password';
          this.classList.remove('pi-eye');
          this.classList.add('pi-eye-slash');
        }
      });
    }
  }


  fundacion: Fundacion = new Fundacion;
  usuario: Usuario = new Usuario;
  persona: Persona = new Persona;
  verficarPassword: any;

  constructor(private _CargarScript: CargarScrpitsService, private toastrService: ToastrService, private fundacionService: FundacionService, private personaService: PersonaService, private usuarioService: UsuarioService, private router: Router, private fotoService: FotoService) {
    this.ValidarCampos();
    _CargarScript.Cargar(["validaciones"]);
  }

  ngOnInit(): void {
    this.ValidarCampos();
    this.verOcultar();
    this.verOcultarDos()
  }
  //Validacion de los campos
  registrarFundacion() {
    // || !this.fundacion.logo || this.fundacion.logo === null 
    if (!this.fundacion.ruc || this.fundacion.ruc === null || !this.fundacion.acronimo || this.fundacion.acronimo === null || !this.fundacion.direccion || !this.fundacion.mision || this.fundacion.mision === null || !this.fundacion.nombre_fundacion || this.fundacion.nombre_fundacion === null
      || !this.persona.apellidos || this.persona.apellidos === null || !this.persona.cedula || this.persona.cedula === null || !this.persona.direccion || this.persona.direccion === null || !this.persona.nombres || this.persona.nombres === null
      || !this.usuario.username || this.usuario.username === null || !this.usuario.password || this.usuario.password === null) {
      this.toastrService.error('Verifique los campos obligatorios', 'Uno o más campos vacios', {
        timeOut: 3000,
      });
    } else {
      this.fundacionService.verfRuc(this.fundacion.ruc).subscribe(
        dataFundacionRuc => {
          if (!dataFundacionRuc) {
            if (this.fundacion.ruc.length === 13) {
              //Validar Cedular
              // if (this.persona.cedula.length === 10) {}
              this.personaService.getPorCedula(this.persona.cedula).subscribe(
                resultPersonaCedula => {
                  if (resultPersonaCedula === null) {
                    if (this.persona.cedula?.length === 10) {
                      //Validar la edad
                      if (this.validarEdad == true) {
                        this.usuarioService.verfUsername(this.usuario.username).subscribe(
                          dataUsername => {
                            if (!dataUsername) {
                              if (this.verficarPassword == this.usuario.password) {
                                this.personaService.postPersona(this.persona).subscribe(
                                  dataPersona => {
                                    console.log(dataPersona);
                                    this.persona = dataPersona;
                                    this.persona.idPersona = this.persona.idPersona;
                                    this.fundacion.persona = this.persona;
                                    this.fundacion.logo = this.foto_fundacion;
                                    this.fundacion.estado = true;
                                    this.cargarImagenFundacion();
                                    this.fundacionService.postFundacion(this.fundacion).subscribe(
                                      dataFundacion => {
                                        console.log(dataFundacion)
                                        this.fundacion = dataFundacion;
                                        this.fundacion.idFundacion = this.fundacion.idFundacion;
                                        this.usuario.idUsuario;
                                        this.usuario.persona = this.persona;
                                        this.usuario.fundacion = this.fundacion;
                                        this.usuario.rol = "ADMIN_FUDACION";
                                        this.usuario.estado = true;
                                        this.usuario.foto_perfil = this.foto_usuario;
                                        this.cargarImagenUsuario();
                                        this.usuarioService.postUsuario(this.usuario).subscribe(
                                          dataUsuario => {
                                            this.toastrService.success('Fundación registrada exitosamente', 'Registro Exitoso', {
                                              timeOut: 1500,
                                            });
                                            this.limpiarCampos();
                                          }
                                        );
                                      }
                                    )
                                  }
                                );
                              } else {
                                this.toastrService.error(
                                  'No son similares',
                                  'Verifique su contraseña',
                                  {
                                    timeOut: 1000,
                                  }
                                );
                              }
                            } else {
                              this.toastrService.error('username ya en uso', 'Digite otro username', {
                                timeOut: 2000,
                              });
                              this.usuario.username = '';
                            }
                          }
                        )
                      } else {
                        this.toastrService.warning('Verifique su fecha de nacimiento!', 'Aviso!', {
                          timeOut: 1000,
                        });
                      }
                    } else {
                      this.toastrService.error('La cédula debe de tener 10 dígitos', 'cédula no procesada', {
                        timeOut: 3000,
                      });
                      this.persona.cedula = '';
                    }
                  } else {
                    this.toastrService.error('La cédula ingresada ya está registrada!', 'cédula en uso', {
                      timeOut: 3000,
                    });
                    this.persona.cedula = '';
                  }
                }
              )
            } else {
              this.toastrService.error('El RUC debe contener 13 dígitos', 'RUC no procesado', {
                timeOut: 3000,
              });
              this.fundacion.ruc = '';
            }
          } else {
            this.toastrService.error('El RUC ya esta registrado', 'RUC en uso', {
              timeOut: 3000,
            });
            this.fundacion.ruc = '';
          }
        }
      )
    }
  }

  // NEVO METODO
  //carga archivo o foto
  async convertToBase64(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = btoa(reader.result as string);
        resolve(result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsBinaryString(file);
    });
  }

  //foto
  async loadPictureCategory(event: any) {
    const file = event.target.files[0];
    try {
      this.usuario.foto_perfil = await this.convertToBase64(file);
    } catch (error) {
      console.error(error);
    }
  }
  // FIN GUARDAR IMG EN BASE DE DATOS

  // IMAGEN USUARIO
  file: any = '';
  image!: any;
  retrievedImage: any;
  foto_usuario: string = "fotoPorDefecto.png";
  cap_nombre_archivo: any;
  selectedFile!: File;
  public imageSelected(event: any) {
    // VALIDAR SOLO IMAGENES
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    const fileSize = file.size / 1024; // tamaño en KB

    if (!allowedExtensions.includes(extension)) {
      // código para manejar archivos no válidos
    } else if (fileSize > 1000) {
      this.toastrService.error(
        'La imagen seleccionada es demasiado grande. El tamaño máximo permitido es de 1000 KB.',
        'Tamaño de archivo no válido!',
        {
          timeOut: 3000,
        }
      );
      return;
    }

    if (!allowedExtensions.includes(extension)) {
      this.toastrService.error(
        'Solo se permiten imágenes en formato JPG, PNG o GIF.',
        'Formato de archivo no válido!',
        {
          timeOut: 3000,
        }
      );
      return;
    }
    this.selectedFile = event.target.files[0];
    // mostrar imagen seleccionada
    this.image = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.file = reader.result;
    };
    this.cap_nombre_archivo = event.target.value;
    this.foto_usuario = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.foto_usuario);
  }

  cargarImagenUsuario() {
    this.fotoService.guararImagenes(this.selectedFile);
  }

  // IMAGEN FUDACION
  imagen!: any;
  filem: any = '';
  foto_fundacion: string = "nodisponible.png";
  cap_nombre_archivo_u: any;
  selectedFiles!: File;
  public imageSelectedl(event: any) {
    // VALIDAR SOLO IMAGENES
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    const fileSize = file.size / 1024; // tamaño en KB

    if (!allowedExtensions.includes(extension)) {
      // código para manejar archivos no válidos
    } else if (fileSize > 1000) {
      this.toastrService.error(
        'La imagen seleccionada es demasiado grande. El tamaño máximo permitido es de 1000 KB.',
        'Tamaño de archivo no válido!',
        {
          timeOut: 3000,
        }
      );
      return;
    }

    if (!allowedExtensions.includes(extension)) {
      this.toastrService.error(
        'Solo se permiten imágenes en formato JPG, PNG o GIF.',
        'Formato de archivo no válido!',
        {
          timeOut: 3000,
        }
      );
      return;
    }
    this.selectedFiles = event.target.files[0];
    // mostrar imagen seleccionada
    this.imagen = this.selectedFiles;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles);
    reader.onload = () => {
      this.filem = reader.result;
    };
    this.cap_nombre_archivo_u = event.target.value;
    this.foto_fundacion = this.cap_nombre_archivo_u.slice(12);
    console.log("Nombre imagen original => " + this.foto_fundacion);
  }

  cargarImagenFundacion() {
    this.fotoService.guararImagenes(this.selectedFiles);
  }

  limpiarCampos() {
    this.persona.cedula = '';
    this.persona.correo = '';
    this.persona.genero = '';
    this.persona.fechaNacimiento = new Date;
    this.persona.direccion = '';
    this.persona.nombres = '';
    this.persona.apellidos = '';
    this.persona.telefono = '';
    this.fundacion.nombre_fundacion = '';
    this.fundacion.acronimo = '';
    this.fundacion.ruc = '';
    this.fundacion.direccion = '';
    this.fundacion.mision = '';
    this.fundacion.telefono = '';
    this.fundacion.correo = '';
    this.usuario.username = '';
    this.usuario.password = '';
    this.verficarPassword = '';
    this.file = '';
    this.filem = '';
    this.limpiarFormulario();
  }
}
