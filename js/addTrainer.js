$(function (){

	var firstImageData = "";
  var firstImageName = "";
	var trainerName = "";
	var description = "";
	var trainerAddress = "";
	var area = "";
	var city = "";
	var contact = "";
	var email = "";
	var timing = "";

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
      trainerName = $("#txtTrainerName").val();
      description = $("#txtDescription").val();
      trainerAddress = $("#txtTrainerAddress").val();
      area = $("#txtArea").val();
      city = $("#txtCity").val();
      contact = $("#txtContact").val();
      email = $("#txtEmail").val();
      timing = $("#txtTiming").val();

			var data={
				"trainerName" : trainerName,
				"description" : description,
				"trainerAddress" : trainerAddress,
				"trainerArea" : area,
				"trainerCity" : city,
				"contactNo" : contact,
				"email" : email,
				"timing" : timing,
				"trainerImage": firstImageData,
				"trainerImageName" : firstImageName,
				"method"  : "saveTrainerDetailsFromDesktop",
				"format" : "json"
			};
			var env = environment.getEnv();
			$.post(""+env+"",data)
			.done(function (response){
				if(response.saveTrainerDetailsResponse==="TRAINER_DETAILS_SAVED") {
          alert('Trainer is successfully added!');
          window.location.href = "TrainerList.html";
        }
        else {
          alert('Trainer is not added! Please try again.');
        }
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		}
	});

	$("#trainerForm").validate({
     rules: {
        trainerName: {
           required: true,
        },
        trainerAddress: {
           required: true,
        },
        contact: {
           required: true,
        }
     },
     messages: {
        trainerName: {
           required: "Please provide trainer name!",
        },
        trainerAddress: {
           required: "Please provide trainer address!",
        },
        contact: {
           required: "Please provide contact of trainer!",
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
