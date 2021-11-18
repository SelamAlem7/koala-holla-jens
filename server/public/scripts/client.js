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
      <tr id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
      </tr>
    `)
    if (koala.ready_to_transfer = 'N') {
      $(this).append(`
      <td><button class="markReady-btn" data-id="${koala.id}" data-ready-status="${koala.ready_to_transfer}">Ready to Transfer</button></td>
      `
      )}
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
    // console.log('Response from server.', response);
    getKoalas();
  }).catch((error) => {
    console.error(error);
    });
} // end saveKoala

// create function to change mark ready for transfer
function handleMarkReady() {
  const koalaIdToMark = $(this).data('id');
  const currentReadyStatus = $(this).data('ready-status');
  // console.log(bookIdToMark);
  // console.log(currentReadStatus);
  $.ajax({
    type: 'PUT',
    url: `/koalas/${koalaIdToMark}`,
    data: {currentReadyStatus: currentReadyStatus}
  }).then((res) => {;
    refreshBooks();
  }).catch((error) => {
    console.error(error);
  })
} // end handleMarkRead
