frappe.ready(function() {
  // Crear el teléfono en la parte superior
  let phoneIcon = `<div id="phone-icon" style="position: fixed; top: 10px; right: 10px; cursor: pointer;">
                      <i class="octicon octicon-device-mobile" style="font-size: 24px;"></i>
                   </div>`;
  $('body').append(phoneIcon);

  // Mostrar el teclado numérico al hacer clic en el icono del teléfono
  $('#phone-icon').click(function() {
      let phoneInterface = `<div id="phone-interface" style="position: fixed; top: 50px; right: 10px; background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                              <div id="phone-screen" style="font-size: 20px; margin-bottom: 10px;">0</div>
                              <div id="keypad">
                                  ${[1,2,3,4,5,6,7,8,9,0].map(num => `<button class="keypad-button">${num}</button>`).join('')}
                                  <button id="call-button" style="background: green; color: white;">Llamar</button>
                              </div>
                            </div>`;
      $('body').append(phoneInterface);

      // Manejar los clics en los botones del teclado numérico
      $('.keypad-button').click(function() {
          let currentNumber = $('#phone-screen').text();
          $('#phone-screen').text(currentNumber + $(this).text());
      });

      // Manejar el botón de llamada
      $('#call-button').click(function() {
          let numberToCall = $('#phone-screen').text();
          frappe.call({
              method: "phone_app.api.make_call",
              args: {
                  number: numberToCall
              },
              callback: function(r) {
                  if (r.message.success) {
                      alert('Llamada iniciada');
                      // Mostrar la interfaz de llamada en progreso
                      showCallInProgressInterface();
                  } else {
                      alert('Error al iniciar la llamada');
                  }
              }
          });
      });
  });
});
