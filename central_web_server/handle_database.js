var fs = require('fs');

function addSurveyResults(results){
	fs.writeFile("./ui_files/api/array.txt", results.toString(), function(err) {
		if(err) {
			console.log(err)
			return
		}
	});
}
module.exports = addSurveyResults
