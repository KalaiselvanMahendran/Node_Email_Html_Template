var ejs = require('ejs');
var fs = require('fs');

module.exports = function(router, transporter) {

	var template = fs.readFileSync('./client/views/email_templates/welcome.ejs', 'utf-8');
	var compiledTemplate = ejs.compile(template);

	router.get('/email_invoice', function(req, res){
		var mailOptions = {
				    from: 'xxxxxx@xxxx.com', // sender address
				    to: 'xxxxxx@xxxx.com', // list of receivers
				    subject: 'We\'ve got your order!', // Subject line
				    html: compiledTemplate({first_name: "Kalai"})
				};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log('Message error: ' + error);
			    }
			    res.send(info.response);
			});
	});

	router.get('/preview', function(req, res){
		res.render('email_templates/welcome.ejs', {first_name: "Kalai"});
	});

};