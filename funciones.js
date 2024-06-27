
import { getAll, remove, save, edit, selectOne } from "./firebase.js"
let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control, .form-select').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const mascota = {
            nommascota: document.getElementById('nombremascota').value.trim(),
            tipo: document.getElementById('tipo').value,
            raza: document.getElementById('raza').value.trim(),
            fecha: document.getElementById('fecha').value,
            motivo: document.getElementById('motivo').value.trim(),
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value.trim(),
            fono: document.getElementById('fono').value,
            email: document.getElementById('email').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const registro = await save(mascota)
            if (registro){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registro ingresado correctamente",
                    showConfirmButton: false,
                    timer: 3500 
                });
                limpiar()
            }
            else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Registro no ingresado",
                    text: "El run ya ha sido ingresado",
                    showConfirmButton: false,
                    timer: 3500 
                });
            }

        }
        else{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registro editado correctamente",
                showConfirmButton: false,
                timer: 3500 
            });
            edit(id, mascota)
            limpiar()
            id = 0
        }

    }

})

window.addEventListener('DOMContentLoaded', () => {
    getAll(mascota => {
        let tabla = ''
        mascota.forEach(doc => {
            const item = doc.data()

            tabla += `<tr>
                <td>${item.nommascota}</td>
                <td>${item.tipo}</td>
                <td>${item.raza}</td>
                <td>${item.fecha}</td>
                <td>${item.motivo}</td>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.fono}</td>
                <td>${item.email}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No prodrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {

            btn.addEventListener('click', async () => {

                const mascota = await selectOne(btn.id)
                const item = mascota.data()

                document.getElementById('nombremascota').value = item.nommascota
                document.getElementById('tipo').value = item.tipo
                document.getElementById('raza').value = item.raza
                document.getElementById('fecha').value = item.fecha
                document.getElementById('motivo').value = item.motivo
                document.getElementById('run').value = item.run
                document.getElementById('nombre').value = item.nom
                document.getElementById('fono').value = item.fono
                document.getElementById('email').value = item.email
                document.getElementById('btnGuardar').value = 'Editar'

                document.getElementById('run').readOnly = true
                id = btn.id
            })
        })
    })
})