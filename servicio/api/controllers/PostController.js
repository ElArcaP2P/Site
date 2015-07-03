/**
 * PostController
 *
 * @description :: Server-side logic for managing feeds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
		var id = req.param('id') || false;
		if(!id)
			return res.send();
		Feed.findOne(id).exec(function(err,feed){
			if(err)
				return res.serverError(err);
			res.send(feed);
		})
	}
};
