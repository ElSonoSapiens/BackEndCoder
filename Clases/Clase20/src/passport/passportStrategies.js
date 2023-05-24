import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // se renombra para poder diferenciarlo
import { usersModel } from '../persistencia/models/users.model';

//independientemente de la estrategia hay que crear 2 funcions

passport.serializeUser((user, done) => {
	// recibe toda la info del usuario y solo utiliza el id
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	// busca el id del usuario
	const user = await usersModel.findById(id);
	done(err, user);
});

//1:15
