  // Seleccionar elementos del DOM
  const formulario = document.querySelector('#formulario');
  const listaTweets = document.querySelector('#lista-tweets');
  const imagenInput = document.querySelector('#imagenInput');
  let comen = [];

  eventlistener(); 

  function eventlistener() {
     
      formulario.addEventListener('submit', agregartweet);

      document.addEventListener('DOMContentLoaded', () => {
         
          comen = JSON.parse(localStorage.getItem('comen')) || [];
          console.log(comen);
          // Mostrar los tweets en la página
          crearHTML();
      });
  }

  function agregartweet(e) {
      e.preventDefault(); 


      const tweets = document.querySelector('#tweet').value;

 
      if (tweets === '' && !imagenInput.files[0]) {
          mostrarerror('El mensaje y/o img está vacío  ');
      }


  
      const imagen = imagenInput.files[0];
  
      const imagenUrl = URL.createObjectURL(imagen);

      
      const tweetobj = {
          id: Date.now(),
          tweets: tweets, 
          imagenUrl: imagenUrl 
      };
      comen = [...comen, tweetobj]; 
     
      crearHTML();
      formulario.reset(); 
  }

  function mostrarerror(error) {
   
      const mensajeError = document.createElement('p');
      mensajeError.textContent = error;
      mensajeError.classList.add('error'); 
      const contenido = document.querySelector('#contenido');
      contenido.appendChild(mensajeError);

    
      setTimeout(() => {
          mensajeError.remove();
      }, 3000);
  }

  function crearHTML() {
      limpiarHTMl(); 
      if (comen.length > 0) {
    
          comen.forEach((tweet) => {
          
            //-------------contador infinito---------------------
                let conador=0;
                const botonn=document.createElement('button');
                botonn.classList.add('like-tweet')
                botonn.textContent=`Likes`;
                botonn.addEventListener('click',()=>{
                    conador++;
                    botonn.textContent=`Likes:${conador}`;
                    botonn.style.backgroundColor='rgb(22, 150, 236)'
                })
                //--------------------------------------

              const botonBorrar = document.createElement('button');
              botonBorrar.classList = 'borrar-tweet';
              botonBorrar.innerText = 'Eliminar';
              botonBorrar.onclick = () => {
               
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
             
              const div = document.createElement('div');
              div.classList.add('div-imagen')
              div.textContent = tweet.tweets;

              const imagen = document.createElement('img');
              imagen.src = tweet.imagenUrl;
              imagen.width = 200; 
             
              div.appendChild(imagen);
              div.appendChild(botonBorrar);
              div.appendChild(botoNMegusta);
              div.appendChild(botonn);
              listaTweets.appendChild(div);
          });
      }
      agregarstorage();

  function agregarstorage() {
    
      localStorage.setItem('comen', JSON.stringify(comen));
  }

  function borrarTweet(id) {
      console.log('Eliminando tweet', id);
     
      comen = comen.filter((tweet) => tweet.id !== id);
      // Actualizar la lista de tweets en la página después de eliminar el tweet
      crearHTML();
  }

  function limpiarHTMl() {
    
      while (listaTweets.firstChild) {
          listaTweets.removeChild(listaTweets.firstChild);
      }
  }}