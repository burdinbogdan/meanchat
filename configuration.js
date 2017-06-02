module.exports = {
	PORT: process.env.PORT || 8080,
	connectionDBString: process.env.mongoConDBStr || 'mongodb://admin:admin123@ds155191.mlab.com:55191/chatdb',
	// connectionDBString: process.env.mongoConDBStr || 'mongodb://localhost/meanchatdb',
	envStatus: process.env.status || 'dev',
	secretTokkenWord: process.env.secretTokkenWord || 'secretword'
}