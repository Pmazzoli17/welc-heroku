//console.log("event Handler is called")

// I have added this version of the code to allow team to see what the event API data will look like. 
// The query is static so it shows the same list each time. Will do more work on this on Monday
// This code does not have an on Click at this point. It will run when the eventResults page is loaded
// ML 03-26-17 

 queryURL1 = "http://api.eventful.com/json/events/search?app_key=C4twR9SMnMSRvt9T&location=27713&country_name=united+states&within=5&date=Next+week"

$.ajax({
      url: queryURL1,
      method: 'GET',
      dataType: 'jsonp'

      }).done(function(response, err) {
	
	          for (i=0; i<10; i++){
	              var cityName= response.events.event[i].city_name;
	              
	              //$("#placeholder").append(cityName);
	              var eventName= response.events.event[i].title;
	              //$("#placeholder").prepend("event title: " + eventName);
	              /*var date=new Date();*/
	              var d=response.events.event[i].start_time;
	              //var date=formatDate(d);
	             /* var date=moment(d).format('LLL');*/
	              var address=response.events.event[i].venue_address;
	              //var imgURL=results.events.event[0].image.thumb.url;
	              //formatting date to strip off extra GMT time
	// 			  var myDate = new Date(d);
	// 			  var date = new Date(myDate);
	// 			  myDate = new Date(myDate).toUTCString();
	// 			  myDate = myDate.split(' ').slice(0,4).join(' ');

	// 			  //added time to new field
	// 			  var time = d;
	// 			  time = d.split(' ').slice(1,2).join(' ');


	// $('#eventResults').append("<br><br><b>Event:</b> " + eventName + " - will be in <b>" + cityName + "</b><br> <b>Date: </b>" + myDate + "&nbsp&nbsp&nbsp&nbsp <b>Time: </b>" + time + "<br> <b>Location: </b>" + address);
	                                   
	          }  // end of for LOOP



}); // end of request


