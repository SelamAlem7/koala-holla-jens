console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $('#viewKoalas').on('click', '.markReady-btn', handleMarkReady);
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
    clearInputs();
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
};

function renderKoalas(koalas) {
  console.log('in renderKoalas');
  $('#viewKoalas').empty();

  for (let i=0; i<koalas.length; i++) {
    let koala = koalas[i];
    readyOrNot(koala);
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
  // console.log(koalaIdToMark);
  // console.log(currentReadyStatus);
  $.ajax({
    type: 'PUT',
    url: `/koalas/${koalaIdToMark}`,
    data: {currentReadyStatus: currentReadyStatus}
  }).then((res) => {;
    getKoalas();
  }).catch((error) => {
    console.error(error);
  })
} // end handleMarkRead




function clearInputs()  {
  $('#nameIn').val(''),
  $('#ageIn').val(''),
  $('#genderIn').val(''),
  $('#readyForTransferIn').val(''),
  $('#notesIn').val('')
  console.log('Inputs cleared');
};

function readyOrNot(param) {
  if (param.ready_to_transfer === 'N') {
    $('#viewKoalas').append(`
      <tr id="${param.id}">
        <td>${param.name}</td>
        <td>${param.age}</td>
        <td>${param.gender}</td>
        <td>${param.ready_to_transfer}</td>
        <td>${param.notes}</td>
        <td><button class="markReady-btn" data-id="${param.id}" data-ready-status="${param.ready_to_transfer}">Ready to Transfer</button></td>
      </tr>
    `)
  }
  else $('#viewKoalas').append(`
    <tr id="${param.id}">
      <td>${param.name}</td>
      <td>${param.age}</td>
      <td>${param.gender}</td>
      <td>${param.ready_to_transfer}</td>
      <td>${param.notes}</td>
    </tr>
`)
}
  
