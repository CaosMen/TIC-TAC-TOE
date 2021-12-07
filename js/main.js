/* Clear table (reset, new game) */
function clear_table(message) {
  if (message) {
    Swal.fire(message);
  }

  create_table();
}

/* Create an empty table to play */
function create_table() {
  /* Clear DIV */
  $('#game').empty();

  for (let i = 0; i < 3; i++) {
    let current_row = document.createElement('tr');
    
    for (let j = 0; j < 3; j++) {
      current_element = document.createElement('td');

      current_element.setAttribute('row', i);
      current_element.setAttribute('column', j);

      current_row.appendChild(current_element);
    }

    $('#game').append(current_row);
  }
}

$(document).ready(function() {
  $('#player-1, #player-2').select2({
    minimumResultsForSearch: -1,
    width: '100px'
  });

  create_table();
});