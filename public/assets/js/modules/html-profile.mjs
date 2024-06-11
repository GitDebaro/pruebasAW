function actualizarUsuario(user){
    if(user.image){
        const foto = document.getElementById('pfp');
        foto.src= user.image;
    }
    crearTablaDatos(user)
}

function crearTablaDatos(datos) {
    const tabla = document.getElementById('tablaDatos');
    tabla.setAttribute("class", "striped");

    tabla.innerHTML = ` <tr>
                            <th scope="row">Nombre</th>
                            <td>${datos.nombre}</td>
                        </tr>
                        <tr>
                            <th scope="row">Apellido</th>
                            <td>${datos.apellidos}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>${datos.email}</td>
                        </tr>`;

}

export { actualizarUsuario};