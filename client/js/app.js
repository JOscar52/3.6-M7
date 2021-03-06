
$(function(){
  $('#logout').click(function(){
    logoutRequest();
  })

})

function logoutRequest(){
  $.ajax({
    url: '../server/logout.php',
    dataType: "text",
    cache: false,
    processData: false,
    contentType: false,
    type: 'GET',
    success: function(php_response){
      window.location.href = 'index.html';
    },
    error: function(){
      alert("error en la comunicación con el servidor");
    }
  })
}

/******************************************/
alert("apps.js");
class EventsManager {
    constructor() {
        this.obtenerDataInicial()
    }


    obtenerDataInicial() {
        let url = '../server/getEvents.php'
        alert("obtenerDataInicial");
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          //processData: false,
          //contentType: false,
          type: 'GET',
          success: function(data){
            alert("1A data "+data+" msg "+data.msg);
            alert("sql "+data.sq);
            if (data.msg=="OK") {
              alert("LEER DATOS getAgendaUser "+data.msg)
              //this.poblarCalendario(data.eventos)
              /*************************************/
              /************************************/
              $('div.primera').find('h1').append(data.nombre);
              $.each(data.infoAgenda, function(key, value){
                $('#table-body').append(`
                  <tr>
                    <td>    </td>
                    <td>${value['titulo']} </td>
                    <td>${value['start_date']}</td>
                    <td>${value['end_date']}</td>
                    <td>${value['start_hour']}</td>
                    <td>${value['end_hour']}</td>
                  </tr>

                  `)
              })
              /***********************************/
              /***********************************/
            }else {
              alert("111 "+data.msg);
              window.location.href = 'index.html';
            }
          },
          error: function(){
            alert("2A data "+data);
            alert("error 1 en la comunicación con el servidor");
          }
        })

    }

    poblarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
        		left: 'prev,next today',
        		center: 'title',
        		right: 'month,agendaWeek,basicDay'
        	},
        	defaultDate: '2016-11-01',
        	navLinks: true,
        	editable: true,
        	eventLimit: true,
          droppable: true,
          dragRevertDuration: 0,
          timeFormat: 'H:mm',
          eventDrop: (event) => {
              this.actualizarEvento(event)
          },
          events: eventos,
          eventDragStart: (event,jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png");
            $('.delete-btn').css('background-color', '#a70f19')
          },
          eventDragStop: (event,jsEvent) =>{
            var trashEl = $('.delete-btn');
            var ofs = trashEl.offset();
            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);
            if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                  this.eliminarEvento(event, jsEvent)
                  $('.calendario').fullCalendar('removeEvents', event.id);
            }

          }
        })
    }

    anadirEvento(){
      alert("Añadir Evento");
      var form_data = new FormData();
      form_data.append('titulo', $('#titulo').val());
      form_data.append('start_date', $('#start_date').val());
      form_data.append('allDay', document.getElementById('allDay').checked);
      if (!document.getElementById('allDay').checked) {
        form_data.append('end_date', $('#end_date').val());
        form_data.append('end_hour', $('#end_hour').val());
        form_data.append('start_hour', $('#start_hour').val());
      }else {
        form_data.append('end_date', "");
        form_data.append('end_hour', "");
        form_data.append('start_hour', "");
      }

      //var start_date  = $('#login-form').find('#start_date').val();
      //var passw = $('#login-form').find('#passw').val();

      //alert("Ajax start_date "+form_data.('start_date'));
      $.ajax({
        url: '../server/new_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        //data: {start_date: start_date},
        type: 'POST',
        //success: (data) =>{
        success: function(data){
          alert("data data "+data);
            alert("data.msg *** "+data.msg);
          if (data.msg=="OK") {
            //this.obtenerDataInicial();
            alert("abrir ventana main.html");
            window.location.href = 'main.html';
            alert('Se ha añadido el evento exitosamente aquí estoy');
            if (document.getElementById('allDay').checked) {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val(),
                allDay: true
              })
            }else {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val()+" "+$('#start_hour').val(),
                allDay: false,
                end: $('#end_date').val()+" "+$('#end_hour').val()
              })
            }
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error 3 en la comunicación con el servidor");
        }
      })

    }

    eliminarEvento(event, jsEvent){

      var form_data = new FormData()
      form_data.append('id', event.id)
      $.ajax({
        url: '../server/delete_event.php',
        dataType: "json",
        cache: false,
        //processData: false,
        //contentType: false,
        data: form_data,
        type: 'POST',
        success: (data) =>{
          if (data.msg=="OK") {
            alert('Se ha eliminado el evento exitosamente')
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error 4 en la comunicación con el servidor");
        }
      })
      $('.delete-btn').find('img').attr('src', "img/trash.png");
      $('.delete-btn').css('background-color', '#8B0913')
    }

    actualizarEvento(evento) {
        let id = evento.id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour

        start_date = start.substr(0,10)
        end_date = end.substr(0,10)
        start_hour = start.substr(11,8)
        end_hour = end.substr(11,8)


        form_data.append('id', id)
        form_data.append('start_date', start_date)
        form_data.append('end_date', end_date)
        form_data.append('start_hour', start_hour)
        form_data.append('end_hour', end_hour)

        $.ajax({
          url: '../server/update_event.php',
          dataType: "json",
          cache: false,
          //processData: false,
          //contentType: false,
          data: form_data,
          type: 'POST',
          success: (data) =>{
            if (data.msg=="OK") {
              alert('Se ha actualizado el evento exitosamente')
            }else {
              alert(data.msg)
            }
          },
          error: function(){
            alert("error 2 en la comunicación con el servidor");
          }
        })
    }

}


$(function(){
  initForm();
  var e = new EventsManager();
  $('form').submit(function(event){
    event.preventDefault()
    e.anadirEvento()
  })
});



function initForm(){
  $('#start_date, #titulo, #end_date').val('');
  $('#start_date, #end_date').datepicker({
    dateFormat: "yy-mm-dd"
  });
  $('.timepicker').timepicker({
    timeFormat: 'HH:mm',
    interval: 30,
    minTime: '5',
    maxTime: '23:30',
    defaultTime: '7',
    startTime: '5:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
  $('#allDay').on('change', function(){
    if (this.checked) {
      $('.timepicker, #end_date').attr("disabled", "disabled")
    }else {
      $('.timepicker, #end_date').removeAttr("disabled")
    }
  })

}
