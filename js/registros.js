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

function guardarAfiliado(){
  var rut, nombres, apellidos, email, telefono, rd1, rd2, edad, montototal, expresiones;
  
  rut = document.getElementById("rut").value;
  nombres = document.getElementById("nombres").value;
  apellidos = document.getElementById("apellidos").value;
  email = document.getElementById("email").value;
  telefono = document.getElementById("telefono").value;
  rd1 = document.getElementById("masculino").checked;
  rd2 = document.getElementById("femenino").checked;
  edad = document.getElementById("edad").value;
  montototal = document.getElementById("montototal").value;

  expresiones = /\w+@\w+\.+[a-z]/;

  if (rut==="" || nombres==="" || apellidos==="" || email==="" || telefono==="" || edad==="" || montototal===""){
    alert("Error: Todos los campos son obligatorios.");
    return false;
  }else if(!expresiones.test(email)){
    alert("Error: El correo no es válido.");
    return false;
  }
  
  Swal.fire({
    title: '¡Atención!',
    text: "¿Seguro deseas guardar el registro ingresado?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      var registro = JSON.parse(localStorage.getItem("registro"))
      if (!registro) {
        localStorage.setItem("registro",JSON.stringify([]))
      }
  
      var obj = {
        rut: rut,
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        telefono: telefono,
        rd1: masculino,
        rd2: femenino,
        edad: edad,
        montototal: montototal
      }
  
      registro.push(obj)
      localStorage.setItem("registro",JSON.stringify(registro))
      Swal.fire({
        title: 'Solicitud enviada de forma exitosa.',
        confirmButtonText: `OK`,
        icon: 'success'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = 'admin.html'
        }
      })
  
    }
  })
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function cargaInicial() {
    if (!localStorage.getItem("registro")) {
        localStorage.setItem("registro",JSON.stringify([]))
    }
    var d = JSON.parse(localStorage.getItem("registro"))
    var columnas = ["rut","nombres","apellidos","montototal","montoretiro10"]
    var body = document.getElementById("filas")
    var contador = 0
    for (const iterator of d) {
        var tr = document.createElement("tr")
        columnas.forEach(element => {
            var td = document.createElement("td")
            var text = ""
            td.appendChild(text)
            tr.appendChild(td)
        });
        body.appendChild(tr)
        document.getElementById(`${contador}`).addEventListener("click",function(e) {
          console.log(e.target.id)
          Swal.fire({
              title: '¿Estás seguro?',
              text: "¡Esta opción no se podrá revertir!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '¡Sí, eliminar!',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                  var d = JSON.parse(localStorage.getItem("registro"))
                  d.splice(e.target.id,1)
                  localStorage.setItem("registro",JSON.stringify(d))
                  location.reload()
              //   Swal.fire(
              //     '¡Eliminado!',
              //     'El registro ha sido eliminado.',
              //     'success'
              //   )
              }
          })              
        })
        contador++
    }
}
cargaInicial()