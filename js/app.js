$(document).ready(function(){

	 $(function() {
    $( ".sortable-items" ).sortable();
  	});
	loadCategories()
	
	$("#Task_Title").focus();
	$("#Task_Title").keyup(function(e){

		let task_title;
		if (e.which == 13) {
     		e.preventDefault();
     		task_title = $(this).val()
     		

     		
     		if(task_title.trim() !== "" && task_title.trim().length > 1){
     			let lowerCase = task_title.toLowerCase()
     			if(task_title.indexOf("new c ") >= 0 || lowerCase.indexOf("new c ") >= 0){


     				task_title = task_title.replace(" C ", " c ")
     				let category = task_title.replace("new c ", "")
 					let categories = localStorage.getItem("tibbles_categories")
		


					if(categories == null){
						categories = [];
						categories.push(category)
						localStorage.setItem("tibbles_categories", JSON.stringify(categories))
					}else{
						categories = JSON.parse(categories)
						if(jQuery.inArray(category, categories) !== -1){

							$(".notification .tibble_noticationResponse").html("Category <b>" +category+ "</b> is already created")
							$(".notification").css("transform", "unset")
							delaycloseNotification()
								
     					}else{
     						categories.push(category)
							localStorage.setItem("tibbles_categories", JSON.stringify(categories))
     						$(".notification .tibble_noticationResponse").html("New Category <b>" +category+ "</b> has been created")
							$(".notification").css("transform", "unset")
							delaycloseNotification()
     					}
     					
					}

  
     			}else{
     				displayNewTask(task_title)
     			}
     			resetTaskField()
     		}else{

     		}
     		
  		}
	})
});


function delaycloseNotification(){
	var timer = setInterval(closeNotifyMsg, 8000)

	function closeNotifyMsg(){
	$(".notification").css("transform", "translateY(-100px)")
	clearInterval(timer)
	}

}

function loadCategories(){

}

function displayNewTask(task){
	if(task.indexOf("•")  >= 0 ){
		let removeBullets = task.replace(/\•/g, "</div><div class='task'>")
		$.trim(removeBullets)
		$(".list_TasksContainer").prepend(removeBullets)
	}else{
		$(".list_TasksContainer").prepend("<div class='task'>"+task+"</div>")
	}
	
	
}

function resetTaskField(){
	$("#Task_Title").val("")
}