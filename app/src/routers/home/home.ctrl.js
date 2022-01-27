"use strict";

const home = function(req, res){
	res.render("home/index");
};

const login = function(req, res){
	res.render("home/login");
};

const design = function(req, res){
	res.render("home/design");
};

module.exports = {
	home,
	login,
	design,
};
