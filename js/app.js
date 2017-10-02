function getPlayers(){
  var players = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

	for (let i = 0; i < players.length; i++) {
		var endpoint = "https://wind-bow.glitch.me/twitch-api/streams/" + players[i];
		var display = $(".display");

		$.ajax({
			url: endpoint,
			type: "GET",
			dataType: "jsonp",
			success : function(data){
				
				if (data.stream !== null) {
					var $logo = "<div class='list-item online'><div class='profile-img'><img src='"+ data.stream.channel.logo + "' class='avatar'></div>";
					var $display_name = "<div class='screen-name'><a href='" + data.stream.channel.url + "' class='link' target='_blank'>" + data.stream.channel.display_name + "</a></div>";;
					var $status = "<div class='status'><span class='current'>" + data.stream.game + "<span class='match'> : " + data.stream.channel.status   + "</span></span></div></div>";

					display.append($logo + $display_name + $status);

				} else {
					var endpoint2 = "https://wind-bow.glitch.me/twitch-api/channels/" + players[i];

					$.ajax({
						url: endpoint2,
						type: "GET",
						dataType: "jsonp",
						success: function(data2){

              var html = "";
              html += "<div class='list-item offline'><div class='profile-img'><img src='"+ data2.logo + "' class='avatar'></div>";
              html += "<div class='screen-name'><a href='" + data2.url + "' class='link' target='_blank'>" + data2.display_name + "</a></div>";
              html += "<div class='status'><span class='current'>Offline</span></div></div>";

              display.append(html);
						}	
					});
				}
			}
		})
	}
}

$(document).ready(function(){
	getPlayers();
	$("#all").focus();
  
  $("#all").on("click", function(){
    $(".online").removeClass("filter");
    $(".offline").removeClass("filter");
  })
  
  $("#online").on("click", function(){
    $(".online").removeClass("filter");
    $(".offline").addClass("filter");
  });
  
   $("#offline").on("click", function(){
    $(".offline").removeClass("filter");
    $(".online").addClass("filter");
  });
});

