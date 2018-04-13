
// Event Listeners
document.getElementById("wiki").addEventListener("click", function(){
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
});

document.getElementById("submitButton").addEventListener("click", function(e){
  e.preventDefault();
  let test = document.getElementById("wiki-input").value;
  getWikiData(test);
});

// Ajax Call
function getWikiData(searchWord) { 
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchWord + "&prop=info&inprop=url&utf8=&format=json",
    dataType: "jsonp",
    success: function(data) { 
      if (data.query.searchinfo.totalhits === 0) {
         missingError(searchWord);
      } else {
        showWikiResults(data);
      }
    },
    error: function () {
      alert("Something went wrong with your search, please refresh the page and try again");
    }
 });
}

function missingError(searchWord) {
  Alert("No search results for " + searchWord + ". Please try again with a different word");
}

function showWikiResults(data) {
  console.log(data.query.search);
  $( ".displayResults" ).empty();
  for (var i = 0; i < 10; i++) {
    var url = "https://en.wikipedia.org/?curid=" + data.query.search[i].pageid;
		$(".displayResults").append("<a href='" + url + "'>" + "<div class='result-list result-" + i + "'>" + "<span class='result-title title-" + i + "'></span>" + "<span class='result-snippet snippet-" + i + "'></span>" + "</div>" + "</a>" );
  }
  
  for (var j = 0; j < 10; j++) {
		var title = data.query.search[j].title;
		var snippet = data.query.search[j].snippet;
		$(".title-" + j).html("<h3>" + title + "</h3>");
		$(".snippet-" + j).html(snippet);
	}
}

