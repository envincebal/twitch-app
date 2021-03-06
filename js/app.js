function getPlayers() {
	// Array of player usernames
   const players = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

	// Loops through players array and displays information
   for (let i = 0; i < players.length; i++) {
      const endpoint = "https://wind-bow.glitch.me/twitch-api/streams/" + players[i];
      let display = $(".display");

		// This first AJAX call retrieves players info who are currently active
      $.ajax({
         url: endpoint,
         type: "GET",
         dataType: "jsonp",
         success: function (data) {

				// If stream status is active, appends status
            if (data.stream !== null) {
               const $logo = "<tr class='list-item online'><td class='profile-img'><img src='" + data.stream.channel.logo + "' class='avatar'></td>";
               const $display_name = "<td class='screen-name'><a href='" + data.stream.channel.url + "' class='link' target='_blank'>" + data.stream.channel.display_name + "</a></td>";
               const $status = "<td class='status'><span class='current'>" + data.stream.game + "<span class='match'> : " + data.stream.channel.status + "</span></span></td></tr>";

               display.append($logo + $display_name + $status);

            } else {
               const endpoint2 = "https://wind-bow.glitch.me/twitch-api/channels/" + players[i];
					// This second AJAX call retrieves info for players who are currently offline
               $.ajax({
                  url: endpoint2,
                  type: "GET",
                  dataType: "jsonp",
                  success: function (data2) {

                     let html = "";
                     html += "<tr class='list-item offline'><td class='profile-img'><img src='" + data2.logo + "' class='avatar'></td>";
                     html += "<td class='screen-name'><a href='" + data2.url + "' class='link' target='_blank'>" + data2.display_name + "</a></td>";
                     html += "<td class='status'><span class='current'>Offline</span></td></tr>";

                     display.append(html);
                  }
               });
            }
         }
      })
   }
}

$(document).ready(function () {
   getPlayers();
   $("#all").focus();

	// Event listener that displays all users in players array
   $("#all").on("click", function () {
      $(".online").removeClass("filter");
      $(".offline").removeClass("filter");
   })

	// Event listener that displays only active users
   $("#online").on("click", function () {
      $(".online").removeClass("filter");
      $(".offline").addClass("filter");
   });

	// Event listener that displays only offline users
   $("#offline").on("click", function () {
      $(".offline").removeClass("filter");
      $(".online").addClass("filter");
   });
});
