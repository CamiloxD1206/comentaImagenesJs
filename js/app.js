  // Seleccionar elementos del DOM
  const formulario = document.querySelector('#formulario');
  const listaTweets = document.querySelector('#lista-tweets');
  const imagenInput = document.querySelector('#imagenInput');
  let comen = []; // Arreglo para almacenar los tweets (comentarios) y sus imágenes

  eventlistener(); // Asignar los eventos a los elementos del formulario

  function eventlistener() {
      // Evento para agregar un nuevo tweet cuando se envía el formulario
      formulario.addEventListener('submit', agregartweet);

      // Evento que se dispara cuando el DOM ha sido completamente cargado
      document.addEventListener('DOMContentLoaded', () => {
          // Obtener los tweets almacenados en el LocalStorage al cargar la página
          comen = JSON.parse(localStorage.getItem('comen')) || [];
          console.log(comen);
          // Mostrar los tweets en la página
          crearHTML();
      });
  }

  function agregartweet(e) {
      e.preventDefault(); // Evitar el comportamiento predeterminado del formulario (recargar la página)

      // Obtener el texto del tweet ingresado por el usuario
      const tweets = document.querySelector('#tweet').value;

      // Validar si el tweet está vacío
      if (tweets === '' && !imagenInput.files[0]) {
          mostrarerror('El mensaje y/o img está vacío  ');
      }


      // Obtener la imagen seleccionada por el usuario
      const imagen = imagenInput.files[0];
      // Crear una URL que representa la imagen
      const imagenUrl = URL.createObjectURL(imagen);

      // Crear un objeto que representa el nuevo tweet con su imagen
      const tweetobj = {
          id: Date.now(), // ID único para el tweet
          tweets: tweets, // Texto del tweet
          imagenUrl: imagenUrl // URL de la imagen
      };
      comen = [...comen, tweetobj]; // Agregar el tweet al arreglo comen
      // Actualizar la lista de tweets en la página
      crearHTML();
      formulario.reset(); // Limpiar el formulario después de agregar el tweet
  }

  function mostrarerror(error) {
      // Mostrar un mensaje de error en la página
      const mensajeError = document.createElement('p');
      mensajeError.textContent = error;
      mensajeError.classList.add('error'); // Agregar una clase para estilizar el mensaje
      const contenido = document.querySelector('#contenido');
      contenido.appendChild(mensajeError);

      // Eliminar el mensaje de error después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
          mensajeError.remove();
      }, 3000);
  }

  function crearHTML() {
      limpiarHTMl(); // Limpiar la lista de tweets en la página
      if (comen.length > 0) {
          // Mostrar los tweets en la lista de tweets
          comen.forEach((tweet) => {
              // Crear un botón para eliminar el tweet
              const botonBorrar = document.createElement('button');
              botonBorrar.classList = 'borrar-tweet';
              botonBorrar.innerText = 'Eliminar';
              botonBorrar.onclick = () => {
                  // Llamar a la función para eliminar el tweet
                  borrarTweet(tweet.id);
              };
              //crear un boton para me gusta el tweet
              const botoNMegusta = document.createElement('button');
              botoNMegusta.classList = 'like-tweet';
              botoNMegusta.innerText = 'likes';
              let contador = 0;
              botoNMegusta.addEventListener('click', () => {
                  contador++;
                  if (contador === 1) {
                      botoNMegusta.classList.add('botonmegusta2');
                      botoNMegusta.innerText = 'likes:1';
                  } else if (contador > 1) {
                      reiniciarContador();
                      botoNMegusta.classList.remove('botonmegusta2');
                      botoNMegusta.classList.add('like-tweet')
                      botoNMegusta.innerText = 'likes';

                  }


              })

              function reiniciarContador() {
                  contador = 0;
              }
              // Crear un elemento <div> que contiene el texto del tweet y la imagen
              const div = document.createElement('div');
              div.classList.add('div-imagen')
              div.textContent = tweet.tweets;

              // Agregar la imagen al elemento <div>
              const imagen = document.createElement('img');
              imagen.src = tweet.imagenUrl;
              imagen.width = 200; // Definir el ancho de la imagen (ajústalo según tus necesidades)

              // Agregar el botón de eliminar al elemento <li>
              div.appendChild(imagen);
              div.appendChild(botonBorrar);
              div.appendChild(botoNMegusta)
              listaTweets.appendChild(div);
          });
      }
      agregarstorage(); // Actualizar el LocalStorage con los tweets actuales
  }

  function agregarstorage() {
      // Guardar el arreglo comen en el LocalStorage en formato JSON
      localStorage.setItem('comen', JSON.stringify(comen));
  }

  function borrarTweet(id) {
      console.log('Eliminando tweet', id);
      // Filtrar el arreglo comen para eliminar el tweet con el ID especificado
      comen = comen.filter((tweet) => tweet.id !== id);
      // Actualizar la lista de tweets en la página después de eliminar el tweet
      crearHTML();
  }

  function limpiarHTMl() {
      // Limpiar la lista de tweets en la página
      while (listaTweets.firstChild) {
          listaTweets.removeChild(listaTweets.firstChild);
      }
  }