import React from 'react'
//credenciales
import appFirebase from '../credenciales'

//funciones de firebase
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

//Creamos dos instancias para acceder a las bases de datos de Firestore y Storage utilizando la configuración de Firebase proporcionada en appFirebase.
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const Form = () => {
  //1.- variable
  //Esta variable se utilizará para almacenar la URL de la imagen que se cargue en el formulario.
  let urlImgDesc;

  //2.- funcion para guardar la informacion en la base de datos
  const guardarInfo = async (e) => {
    e.preventDefault(); //para evitar que se recargue la pagina
    // extraemos los valores de los campos de nombre y precio del formulario y los almacenamos en las variables nombre y precio.
    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;

    const newComida = {
      nombre: nombre,
      precio: precio,
      imagen: urlImgDesc,
    };
    //2.- Guardar la informacion en la base de datos Firestore
    try {
      await addDoc(collection(db, "comidas"), {
        newComida
      }); 
    } catch (error) {
      console.log(error);
    }

    //3.- limpiar o resetear los campos del formulario 
    e.target.nombre.value = '';
    e.target.precio.value = '';
    e.target.file.value = '';
  };
  //3.- guardar la informacion en la base de datos Storage

  const fileHandler = async (e) => {
    //detectar el archivo
    const archivoImg = e.target.files[0];

    //cargar el archivo al storage
    const refArchivo = ref(storage, `documentos/${archivoImg.name}`);
    await uploadBytes(refArchivo, archivoImg);

    //obtener la url del archivo
    urlImgDesc = await getDownloadURL(refArchivo); //con esta url obtengo la imagen y sirve para la base de datos de firestore
  };

  return (
    <div className="card card-body">
      {/* titulo */}
      <h3 className="text-center">Agregar Comida</h3>

      {/* formulario */}
      <form onSubmit={guardarInfo}>
        {/* celda de nombre */}
        <label className="">Nombre</label>
        <div className="form-group">
          <input
            type="text"
            placeholder="Ingresa el nombre de la comida"
            id="nombre"
            className="form-control mt-1"
            required
          />
        </div>
        {/* celda de precio */}
        <label className="">Precio</label>
        <div className="form-group">
          <input
            type="text"
            placeholder="Ingresa el precio de la comida"
            id="precio"
            className="form-control mt-1"
            required
          />
        </div>
        {/* boton para subir la imagen */}
        <label className="">Agregar imagen</label>
        <input
          type="file"
          id="file"
          placeholder="Agregar imagen"
          className="form-control"
          onChange={fileHandler}
        />
        <button className="btn btn-primary mt-3 form-control">Guardar</button>
      </form>
    </div>
  );
}

export default Form