$(function (){

	var firstImageData = "";
  var firstImageName = "";
	var groomerName = "";
	var description = "";
	var groomerAddress = "";
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
      groomerName = $("#txtGroomerName").val();
      description = $("#txtDescription").val();
      groomerAddress = $("#txtGroomerAddress").val();
      area = $("#txtArea").val();
      city = $("#txtCity").val();
      contact = $("#txtContact").val();
      email = $("#txtEmail").val();
      timing = $("#txtTiming").val();

			var data={
				"groomerName" : groomerName,
				"description" : description,
				"groomerAddress" : groomerAddress,
				"groomerArea" : area,
				"groomerCity" : city,
				"contactNo" : contact,
				"email" : email,
				"timing" : timing,
				"groomerImage": firstImageData,
				"groomerImageName" : firstImageName,
				"method"  : "saveGroomerDetailsFromDesktop",
				"format" : "json"
			};
			var env = environment.getEnv();
			$.post(""+env+"",data)
			.done(function (response){
				if(response.saveGroomerDetailsResponse==="GROOMER_DETAILS_SAVED") {
          alert('Groomer is successfully added!');
          window.location.href = "GroomerList.html";
        }
        else {
          alert('Groomer is not added! Please try again.');
        }
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		}
	});

	$("#groomerForm").validate({
     rules: {
        groomerName: {
           required: true,
        },
        groomerAddress: {
           required: true,
        },
        contact: {
           required: true,
        }
     },
     messages: {
        groomerName: {
           required: "Please provide groomer name!",
        },
        groomerAddress: {
           required: "Please provide groomer address!",
        },
        contact: {
           required: "Please provide contact of groomer!",
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
