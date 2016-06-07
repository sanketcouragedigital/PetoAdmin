$(function (){
	$("#txtOtherBreed").hide();

	var firstImageData = "";
  var firstImageName = "";
  var secondImageData = "";
  var secondImageName = "";
  var thirdImageData = "";
  var thirdImageName = "";
	var categoryOfPet = "";
	var breedOfPet = "";
	var ageInMonth = "";
	var ageInYear = "";
	var genderOfPet = "";
	var descriptionOfPet = "";
	var email = "";
	var alternateNo = "";

	var env = environment.getEnv();
	$.get(""+env+"?method=showPetCategories&format=json")
	.done(function (response){
		var select = document.getElementById("selectCategory");
		$.each(response.showPetCategoriesResponse,function (index,loadCategory){
			var loadCategoryObj=loadCategory;
			var category=loadCategory.pet_category
			var option=document.createElement('option');
			option.text=option.value=category;
			select.add(option);
		});
	})
	.fail(function (){
  	alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
	});

	$("#selectCategory").on("change",function(){
		var selectedCategory=$('option:selected','#selectCategory').val();
		var select = document.getElementById("selectBreed");
		var length = select.options.length;
		for(i=length-1;i>=0;i--){
			select.remove(i);
		}
		var env = environment.getEnv();
		$.get(""+env+"?petCategory="+selectedCategory+"&method=showPetBreedsAsPerPetCategory&format=json")
		.done(function(response){
			var select = document.getElementById("selectBreed");
			var option = document.createElement('option');
			option.text = option.value = "Select Breed";
			select.add(option);
			if (option.value == "Select Breed") {
    		option.disabled = true;
  		}
			$.each(response.showPetBreedsResponse,function(index,breed){
				var loadBreedObj = breed;
				var petBreed = loadBreedObj.pet_breed;
				var option = document.createElement('option');
				option.text= option.value=petBreed;
				select.add(option);
			});
			select.options[0].selected = true;
 		})
		.fail(function (){
			alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
    });

	});

	$("#selectBreed").on("change",function(){
		var breedOfPet = $("#selectBreed").val();
		if(breedOfPet == "Other"){
			$("#txtOtherBreed").show();
		}else {
			$("#txtOtherBreed").hide();
		}

	});

	$("input[name='gender']").on('ifChanged', function(event){
		if (this.value == 'Male') {
      genderOfPet = this.value;
    }
		else if(this.value == "Female") {
      genderOfPet = this.value;
    }
	});

  $('#first-image-cropit-image-input').change(function() {
    firstImageName = getDate();
  });

  $('#second-image-cropit-image-input').change(function() {
    secondImageName = getDate();
  });

  $('#third-image-cropit-image-input').change(function() {
    thirdImageName = getDate();
  });

	jQuery.validator.setDefaults({
    debug: true,      //Avoids form submit. Comment when in production.
    success: "valid",
    submitHandler: function() {

			if($('#first-image-cropper').cropit('export') != null) {
        firstImageData = $('#first-image-cropper').cropit('export');
      }
      if($('#second-image-cropper').cropit('export') != null) {
        secondImageData = $('#second-image-cropper').cropit('export');
      }
      if($('#third-image-cropper').cropit('export') != null) {
        thirdImageData = $('#third-image-cropper').cropit('export');
      }

			categoryOfPet = $("#selectedCategory").val();
			if($("#selectBreed").val() == "Other") {
				breedOfPet = $("#txtOtherBreed").val();
			}
			else {
				breedOfPet = $("#selectBreed").val();
			}
			if($("#selectMonth").val() == null) {
				ageInMonth = "0";
			}
			else {
				ageInMonth = $("#selectMonth").val();
			}
			if($("#selectYear").val() == null) {
				ageInYear = "0";
			}
			else {
				ageInYear = $("#selectYear").val();
			}
			descriptionOfPet = $("#txtDescription").val();
			if($("#txtAlternateNo").val() == "") {
				alternateNo = "";
			}
			else {
				alternateNo = $("#txtAlternateNo").val();
			}
			if($("#txtEmail").val() == "") {
				email = localStorage.getItem("email");
			}
			else {
				email = $("#txtEmail").val();
			}

			var data={
				"categoryOfPet" : categoryOfPet,
				"breedOfPet" : breedOfPet,
				"petAgeInMonth" : ageInMonth,
				"petAgeInYear" : ageInYear,
				"genderOfPet" : genderOfPet,
				"descriptionOfPet" : descriptionOfPet,
				"email" : email,
				"alternateNo" : alternateNo,
				"firstPetImage": firstImageData,
				"firstPetImageName" : firstImageName,
				"secondPetImage": secondImageData,
				"secondPetImageName" : secondImageName,
				"thirdPetImage": thirdImageData,
				"thirdPetImageName" : thirdImageName,
				"method"  : "savePetMateDetailsFromDesktop",
				"format" : "json"
			};
			var env = environment.getEnv();
			$.post(""+env+"",data)
			.done(function (response){
				if(response.savePetMateDetailsResponse==="PET_DETAILS_SAVED") {
          alert('Your pet is successfully added!');
          window.location.href = "PetMateList.html";
        }
        else {
          alert('Your pet is not added! Please try again.');
        }
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		}
	});

	$("#petMateForm").validate({
     rules: {
        selectCategory: {
           required: true,
        },
        selectBreed: {
           required: true,
        }
     },
     messages: {
        selectCategory: {
           required: "Please select category!",
        },
        selectBreed: {
           required: "Please select breed!",
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
