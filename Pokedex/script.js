
const container = document.querySelector('#pokemon');

axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
  .then(function (response) {

    // an array of character objects will be stored in this variable. 
    let pokemon = response.data;
    console.log(response.data);

    // let's create an array with just the names of the pokemon (strings only)
    // we will use this array of strings to  populate the autocomplete.
    // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const pokemonNames = pokemon.results.map( pokemon => pokemon.name)

    // create the autocomplete using the character data. 
    const autoCompleteJS = new autoComplete({
      placeHolder: "Search for a Pokemon...",
          data: {
              src: pokemonNames
          }
      });
      // whenever a character is selected, 
      // find the character in the characters array,
      // and pass the data along for rendering
      autoCompleteJS.input.addEventListener("selection",  (event) => {
        // using the array filter to locate the character 
        // whose name matches the autocomplete. 
        // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        const [selected] = pokemon.results.filter( 
            pokemon => pokemon.name == event.detail.selection.value 
          ) ;
        renderPokemon(selected); 
      }); 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


  const renderPokemon  = (pokemon) => {


    axios.get(pokemon.url)
    .then(function (response) {
      
      // console.log(pokemon.url);
      // an array of character objects will be stored in this variable. 
      let pokemonURL = response.data;
      // console.log(response.data);
  
      // let's create an array with just the names of the pokemon (strings only)
      // we will use this array of strings to  populate the autocomplete.
      // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      // const pokemonURLs = pokemonURL.map( pokemonURL => pokemonURL.name)
  

       // reset the contents of the container to remove previous result.
      container.innerHTML = '';
      
      // create a template for character details.
      // popuate it with data 
      let pokemonDetails = document.createElement('div');
      let pokemonType0 = document.createElement('div');
      let selectImage = document.createElement('div');
      let pokemonInfo = document.createElement('div');
      pokemonDetails.classList.add('pokemonDetails');
      pokemonType0.classList.add('pokemonType0');
      selectImage.classList.add('selectImage');
      pokemonInfo.classList.add('pokemonInfo');

      let typeNumber = pokemonURL.types.length;
      console.log(typeNumber);

      //add the pokemon image and name

     

      let ddl = document.getElementById("imageType");
      let selectedValue = ddl.options[ddl.selectedIndex].value;

      console.log(selectedValue);

      // select.addEventListener('change', switchFunction);

     
      switch (selectedValue) {
        case 'pixel':
          pokemonDetails.innerHTML = 
            `
              <h2 class="pokemonName">${pokemon.name}</h2>
              <img class="spriteImage" src="${pokemonURL.sprites.front_default}" alt="Sorry, image unavailable"> 
            `;
          break;
        case 'dream_world':
          pokemonDetails.innerHTML = 
            `
              <h2 class="pokemonName">${pokemon.name}</h2>
              <img class="spriteImage" src="${pokemonURL.sprites.other.dream_world.front_default}" alt="Sorry, image unavailable"> 
            `;
          break;
        case 'home':
          pokemonDetails.innerHTML = 
            `
              <h2 class="pokemonName">${pokemon.name}</h2>
              <img class="spriteImage" src="${pokemonURL.sprites.other.home.front_default}" alt="Sorry, image unavailable"> 
            `;
          break;
      }

      switchImage = () => {
        let ddl = document.getElementById("imageType");
        let selectedValue = ddl.options[ddl.selectedIndex].value;

        switch (selectedValue) {
          case 'pixel':
            pokemonDetails.innerHTML = 
              `
                <h2 class="pokemonName">${pokemon.name}</h2>
                <img class="spriteImage" src="${pokemonURL.sprites.front_default}" alt="Sorry, image unavailable"> 
              `;
            break;
          case 'dream_world':
            pokemonDetails.innerHTML = 
              `
                <h2 class="pokemonName">${pokemon.name}</h2>
                <img class="spriteImage" src="${pokemonURL.sprites.other.dream_world.front_default}" alt="Sorry, image unavailable"> 
              `;
            break;
          case 'home':
            pokemonDetails.innerHTML = 
              `
                <h2 class="pokemonName">${pokemon.name}</h2>
                <img class="spriteImage" src="${pokemonURL.sprites.other.home.front_default}" alt="Sorry, image unavailable"> 
              `;
            break;
        }
      }
        // input.addEventListener('click',function(){
        //     select.value = 2;
        //     select.dispatchEvent(new Event('change'));
        // });
      
    
      //create the area for pokemon type depending on how many types the pokemon has (1 or 2)
      if(typeNumber == 1){
        pokemonType0.innerHTML = 
        `
        TYPE: <br/> ${pokemonURL.types[0].type.name} <br/> 
        `;
        console.log('Number of Types: 1');
      }else{
        pokemonType0.innerHTML = 
        `
        TYPE: <br/> ${pokemonURL.types[0].type.name} + ${pokemonURL.types[1].type.name} <br/> 
        `;
      }

      //create the area for pokemon stats
      pokemonInfo.innerHTML = 
      `
      <div class="allInfo">
        <div class="sizeGrid">
          <div class="sizeDiv">
            ID: <br/> <div class="stateValue"> ${pokemonURL.id} </div> 
          </div>        
          <div class="sizeDiv">
          Height: <br/> <div class="stateValue"> ${pokemonURL.height} </div> 
          </div>
          <div class="sizeDiv">
          Weight: <br/> <div class="stateValue"> ${pokemonURL.weight} </div> 
          </div>
        </div>
        <div class="statGrid">
          <div class="statDiv">
                  HP: <br/> <div class="stateValue"> ${pokemonURL.stats[0].base_stat} </div> 
          </div>        
          <div class="statDiv">
                  ATTACK: <br/> <div class="stateValue"> ${pokemonURL.stats[1].base_stat} </div> 
          </div>
          <div class="statDiv">
                  DEFENSE: <br/> <div class="stateValue"> ${pokemonURL.stats[2].base_stat} </div> 
          </div>
          <div class="statDiv">
                  SP. ATTACK: <br/> <div class="stateValue"> ${pokemonURL.stats[3].base_stat} </div> 
          </div>
          <div class="statDiv">
                  SP. DEFENSE: <br/> <div class="stateValue"> ${pokemonURL.stats[4].base_stat} </div>  
          </div>
          <div class="statDiv">
                  SPEED: <br/> <div class="stateValue"> ${pokemonURL.stats[5].base_stat} </div>  
          </div>
        </div>
      </div>
      `;

      
    // add everything to the page.
    container.appendChild(pokemonDetails); 
    container.appendChild(pokemonType0); 
    container.appendChild(selectImage);
    container.appendChild(pokemonInfo); 

    })
  }

