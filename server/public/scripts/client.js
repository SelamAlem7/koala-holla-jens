console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };

    $.ajax({
      method: 'POST',
      url: '/koalas',
      data: koalaToSend
    }).then((response) => {
      console.log('response', response);
      saveKoala( koalaToSend );
      clearInputs();
    // call saveKoala with the new obejct
  }).catch((error) => {
    console.error(error);
  });
  })
};

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
}).then(function(response) {
    console.log(response);
    for (let koala of response) {
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
}).catch(function (error) {
    console.log('error in koalas get', error);
});
}
// end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}


function clearInputs()  {
  $('#nameIn').val(''),
  $('#ageIn').val(''),
  $('#genderIn').val(''),
  $('#readyForTransferIn').val(''),
  $('#notesIn').val('')
  console.log('Inputs cleared');
};