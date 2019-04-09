const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '3',
			name: 'John',
			email: 'fakejohn@email.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'fakesally@email.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

const getUser = (id) => {
	let foundUser = null;
	database.users.forEach(user => {
		if (user.id === id || user.email === id) {
			foundUser = user;
		}
	});
	return foundUser;
}

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	const user = getUser(req.body.email);
	if (user && (req.body.email === user.email &&
		req.body.password == user.password)) {
		res.json('success');
	}
	else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body
	database.users.push({
		id: 125,
		email: email,
		name: name,
		password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(getUser(email));
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	const user = getUser(id);
	if (user) {
		return res.json(user);
	}
	return res.status(404).json('user not found');
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	const user = getUser(id);
	if (user) {
		user.entries++;
		return res.json(user.entries);
	}
	return res.status(404).json('user not found');
});

app.listen(3000, () => {
	console.log('app is runing on port 3000');
});

/*
 / --> res = works!
 /signin --> POST res = success|fail
 /register --> POST res = createdUser
 /profile/:userid --> GET res = user
 /image --> PUT res = user


bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

*/