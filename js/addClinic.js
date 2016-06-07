$(function (){

	var firstImageData = "";
  var firstImageName = "";
	var clinicName = "";
	var doctorName = "";
	var clinicAddress = "";
	var area = "";
	var city = "";
	var contact = "";
	var email = "";
	var notes = "";

  $('#first-image-cropit-image-input').change(function() {
    firstImageName = getDate();
  });

	jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {

			if($('#first-image-cropper').cropit('export') != null) {
        firstImageData = $('#first-image-cropper').cropit('export');
      }
      clinicName = $("#txtClinicName").val();
      doctorName = $("#txtDoctorName").val();
      clinicAddress = $("#txtClinicAddress").val();
      area = $("#txtArea").val();
      city = $("#txtCity").val();
      contact = $("#txtContact").val();
      email = $("#txtEmail").val();
      notes = $("#txtNotes").val();

			var data={
				"clinicName" : clinicName,
				"doctorName" : doctorName,
				"clinicAddress" : clinicAddress,
				"clinicArea" : area,
				"clinicCity" : city,
				"contactNo" : contact,
				"email" : email,
				"notesOfClinic" : notes,
				"clinicImage": firstImageData,
				"clinicImageName" : firstImageName,
				"method"  : "saveClinicDetailsFromDesktop",
				"format" : "json"
			};
			var env = environment.getEnv();
			$.post(""+env+"",data)
			.done(function (response){
				if(response.saveClinicDetailsResponse==="CLINIC_DETAILS_SAVED") {
          alert('Clinic is successfully added!');
          window.location.href = "ClinicList.html";
        }
        else {
          alert('Clinic is not added! Please try again.');
        }
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		}
	});

	$("#clinicForm").validate({
     rules: {
        clinicName: {
           required: true,
        },
        clinicAddress: {
           required: true,
        },
        contact: {
           required: true,
        }
     },
     messages: {
        clinicName: {
           required: "Please provide clinic name!",
        },
        clinicAddress: {
           required: "Please provide clinic address!",
        },
        contact: {
           required: "Please provide contact of clinic!",
        }
      },
			errorPlacement: function(error, element) {
				if (element.attr('type') === 'radio') {
					error.insertBefore(element);
				}
				else {
					error.insertAfter(element);
				}
	    }
  });

  function getDate() {
    var currentdate = new Date();
    var year    = currentdate.getFullYear();
    var month   = currentdate.getMonth()+1;
    var day     = currentdate.getDate();
    var hour    = currentdate.getHours();
    var minute  = currentdate.getMinutes();
    var second  = currentdate.getSeconds();
    if(month.toString().length == 1) {
      var month = '0' + month;
    }
    if(day.toString().length == 1) {
        var day = '0' + day;
    }
    if(hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if(second.toString().length == 1) {
        var second = '0' + second;
    }
    var datetime = year + "" + month + "" + day + "_" + hour + "" + minute + "" + second;
    return datetime;
  }
});
