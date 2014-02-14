'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})



/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('.project a').click(addProjectDetails);
  $('#colorBtn').click(randomizeColors);

}

function callBackFn (result) {
  var projectHTML = '<a href="#" class ="thumbnail">' + 
    '<img src="' + result['image'] + '" class="detailsImage">' +
    '<p>' + result['title'] + '</p>' +
    '<p><small>' + result['date'] + '</small></p></a>'+
    '<p>' + result['summary'] +'</p>';

  $("#project" + result['id']).html(projectHTML);

}


//$.post("http://URL", {"json":"json"}, callBa

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
  // Prevent following the link
  e.preventDefault();

  // Get the div ID, e.g., "project3"
  var projectID = $(this).closest('.project').attr('id');
  // get rid of 'project' from the front of the id 'project3'
  var idNumber = projectID.substr('project'.length);

  console.log("User clicked on project " + idNumber);
  var projURL = "/project/" +idNumber;
  console.log("Project URL is "+ projURL);
  $.get(projURL, callBackFn); 


}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
  $.get("/palette", colorCallBack);
}

function colorCallBack (result) {
	var tmp = result['colors'];
	var colors = tmp['hex'];
  $('body').css('background-color', colors[0]);
  $('.thumbnail').css('background-color', colors[1]);
  $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
  $('p').css('color', colors[3]);
  $('.project img').css('opacity', .75);
}


/* goal stretch */
$(function(){
    var username = 'alicenguyen';
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          
          $('#gitrepo').html(outhtml);
        
        } 
    }); 
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});

