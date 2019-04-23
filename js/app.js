$(document).ready(function(){

	loadCategories()
	
	$("#Task_Title").focus();
	$("#Task_Title").keyup(function(e){

		let task_title;
		if (e.which == 13) {
     		e.preventDefault();
     		task_title = $(this).val()
     		

     		
     		if(task_title.trim() !== ""){
     			let lowerCase = task_title.toLowerCase()
     			if(task_title.indexOf("new c ") >= 0 || lowerCase.indexOf("new c ") >= 0){

     				console.log(task_title.indexOf("new c "))
     				task_title = task_title.replace(" C ", " c ")
     				let category = task_title.replace("new c ", "")
 					let categories = localStorage.getItem("tibbles_categories")
					console.log("categories: "+ JSON.parse(categories))


					if(categories == null){
						categories = [];
						categories.push(category)
						localStorage.setItem("tibbles_categories", JSON.stringify(categories))
					}else{
						categories = JSON.parse(categories)
						if(jQuery.inArray(category, categories) !== -1){

							$(".notification .tibble_noticationResponse").html("Category " +category+ " is already created")
							$(".notification").css("transform", "unset")
							delaycloseNotification()
								
     					}else{
     						categories.push(category)
							localStorage.setItem("tibbles_categories", JSON.stringify(categories))
     						console.log(category)
     					}
     					
					}

  
     			}else{
     				displayNewTask(task_title)
     			}
     			
     		}
     		resetTaskField()
  		}
	})
});


function delaycloseNotification(){
	var timer = setInterval(closeNotifyMsg, 8000)

	function closeNotifyMsg(){
	console.log("Close Notify")
	$(".notification").css("transform", "translateY(-100px)")
	clearInterval(timer)
	}

}

function loadCategories(){

}

function displayNewTask(task){
	console.log(task)
	if(task.indexOf("•")  >= 0 ){
		let pizza = task.replace(/\•/g, "</div><div class='task'>")
		$(".list_TasksContainer").prepend(pizza)
	}else{
		$(".list_TasksContainer").prepend("<div class='task'>"+task+"</div>")
	}
	
	
}

function resetTaskField(){
	$("#Task_Title").val("")
}