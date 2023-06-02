import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // se renombra para poder diferenciarlo
import { usersModel } from '../persistencia/models/users.model.js';
import { hashData, compareData } from '../utils.js';

// estrategia Local (username y contraseña)

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			const user = await usersModel.findOne({ email });
			if (!user) {
				return done(null, false);
			}
			const isPassword = await compareData(password, user.password);
			if (!isPassword) {
				return done(null, false);
			}
			done(null, user);
		}
	)
);

//independientemente de la estrategia hay que crear 2 funcions

passport.serializeUser((user, done) => {
	// recibe toda la info del usuario y solo utiliza el id
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	// busca la info a partir del id del usuario
	const user = await usersModel.findById(id);
	done(err, user);
});
