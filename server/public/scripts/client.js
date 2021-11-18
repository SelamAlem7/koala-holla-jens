console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on( 'click', function() {
    console.log('in addButton on click');

    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  }); 
}

function getKoalas() {
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    // console.log(response);
    renderKoalas(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}

function renderKoalas(koalas) {
  console.log('in renderKoalas');
  $('#viewKoalas').empty();

  for (let i=0; i<koalas.length; i++) {
    let koala = koalas[i];

    // for each koala, append a new row to table
    $('#viewKoalas').append(`
      <tr>
      <th>${koala.name}</th>
      <th>${koala.age}</th>
      <th>${koala.gender}</th>
      <th>${koala.ready_to_transfer}</th>
      <th>${koala.notes}</th>
      </tr>
    `)
  }
} // end renderKoalas

function saveKoala(newKoala){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then((response) => {
    console.log('Response from server.', response);
    getKoalas();
  }).catch((error) => {
    console.error(error);
    });
} // end saveKoala