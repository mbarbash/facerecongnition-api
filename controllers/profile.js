const handleProfileGet = (req, res) => {
	const { id } = req.params;
	db('users')
		.where('id', id)
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			}
			else {
				res.status(404).json('user not found');
			}
		})
		.catch(err => res.status(404).json('error getting user'));
}

module.exports = {
	handleProfileGet
};