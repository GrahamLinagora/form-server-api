//
//	Applications controller
//

var fileHelper = require('../helper/fileHelper'),
	path = require('path');

/**
 * Serves the html file to run an application : display and fullfill a form
 *
 * @param req
 * @param res
 */
exports.run = function(req, res) {
	var id = req.path.substring(req.path.lastIndexOf('/') + 1);
	var generatedPath = __dirname+'/../../resources/generated/' + id;

	//TODO check whether an instance with this id exist in the db before doing anything else

	//make a new directory for the app
	fileHelper.createDir(generatedPath);

	//copy static html file into the directory
	fileHelper.copyFileSync(__dirname + '/../../resources/index.html', generatedPath+'/index.html');

	//serve the html file
	res.sendfile(path.resolve(generatedPath,'index.html'));
};
