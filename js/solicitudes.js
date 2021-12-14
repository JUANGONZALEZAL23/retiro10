document.querySelector('#dolar').addEventListener('click', function(){
    obtenerDatos('dolar');
});

document.querySelector('#uf').addEventListener('click', function(){
    obtenerDatos('uf');
});

function obtenerDatos(val){

    let url = `https://mindicador.cl/api/${val}`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){

        if (this.status==200 && this.readyState==4){
            let datos = JSON.parse(this.responseText);
            let resultado =document.querySelector('#resultado');
            resultado.innerHTML = '';

            let i = 0;

            for (let item of datos.serie){
                i++;
                resultado.innerHTML += `<li>${item.fecha.substr(0,10)} | $${item.valor}</li>`;

                if (i>0){
                    break;
                }
            }
        }
    }
}

// const expresiones = {
//   rut: /^\d[0-9-]{1,9}$/, // Números del 0 al 9, de 1 a 9 dígitos.
//   ndocumento: /^\d[0-9]$/, // Números de 0 al 9.
//   cndocumento: /^\d[0-9]$/,
//   nombre: /^[a-zA-ZÀ-y\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
//   apellidos: /^[a-zA-ZÀ-y\s]{1,40}$/,
//   email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-.]+$/, // Letras, números, guión_bajo y arroba.
//   telefono: /^\d{7,14}$/, // 7 a 14 números.
//   fnacimiento: /^\d[0-9]$/
//   }
  
//   formulario.addEventListener('submit', (e)=>{
//   e.preventDefault();
// });

function soloNumeros(e){
  key = e.keyCode || e.Which;
  teclado = String.fromCharCode(key);
  numeros = "0123456789";
  especiales = "8-37-39-46";
  tecla_especial = false;

  for (var i in especiales){
      if (key==especiales[i]){
          tecla_especial = true;
      }
  }
  if (numeros.indexOf(teclado)==-1 && !tecla_especial){
      return false;
  }
}

function guardar(){
  var rut, ndocumento, ndocumento2, nombre, apellidos, email, telefono, fnacimiento, sexo, terminos, expresiones;
  
  rut = document.getElementById("rut").value;
  ndocumento = document.getElementById("ndocumento").value;
  ndocumento2 = document.getElementById("ndocumento2").value;
  nombre = document.getElementById("nombre").value;
  apellidos = document.getElementById("apellidos").value;
  email = document.getElementById("email").value;
  telefono = document.getElementById("telefono").value;
  fnacimiento = document.getElementById("fnacimiento").value;
  rd1 = document.getElementById("masculino").checked;
  rd2 = document.getElementById("femenino").checked;
  terminos = document.getElementById("terminos").checked;

  expresiones = /\w+@\w+\.+[a-z]/;

  if (rut == "" || ndocumento == "" || ndocumento2 == "" || nombre == "" || apellidos == "" || email == "" || telefono == "" || fnacimiento == "" || terminos == false){
    alert("Error: Por favor rellena el formulario correctamente.");
    return false;
  }else if(!expresiones.test(email)){
    alert("Error: El correo no es válido.");
    return false;
  }
  
  Swal.fire({
    title: '¡Atención!',
    text: "¿Seguro deseas enviar tu solicitud para su revisión?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      var datos = JSON.parse(localStorage.getItem("datos"))
      if (!datos) {
        localStorage.setItem("datos",JSON.stringify([]))
      }
  
      var obj = {
        rut: rut,
        ndocumento: ndocumento,
        ndocumento2: ndocumento2,
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        telefono: telefono,
        fnacimiento: fnacimiento,
        rd1: masculino,
        rd2: femenino,
        terminos: terminos
      }
  
      datos.push(obj)
      localStorage.setItem("datos",JSON.stringify(datos))
      Swal.fire({
        title: 'Solicitud enviada de forma exitosa.',
        confirmButtonText: `OK`,
        icon: 'success'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = 'retiro10.html'
        }
      })
  
    }
  })
}