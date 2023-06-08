import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // se renombra para poder diferenciarlo
import { Strategy as GithubStrategy } from 'passport-github2'; // se renombra para poder diferenciarlo
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'; // se renombra para poder diferenciarlo
import { usersModel } from '../persistencia/models/users.model.js';
import { hashData, compareData } from '../utils.js';

const secretKeyJWT = 'secretJWT';

//
// LOCAL (username y contraseña)
//

passport.use(
	'login',
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

passport.use(
	'registro',
	new LocalStrategy(
		{
			usernameField: 'email',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const userDB = await usersModel.findOneAndDelete({ email });
			if (userDB) {
				return done(null, false);
			} else {
				const hashPassword = await hashData(password);
				const newUser = { ...req.body, password: hashPassword };
				const newUserDB = await usersModel.create(newUser);
				done(null, newUserDB);
			}
		}
	)
);

//
// GITHUB
//

passport.use(
	'github',
	new GithubStrategy(
		{
			clientID: 'Iv1.37b5c0aea6358b78',
			clientSecret: '9bf60de2a487b2634c4c1c757694b315a05ef8dc',
			callbackURL: 'http://localhost:8080/users/github',
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile);

			const email = profile._json.email;
			const userDB = await usersModel.findOne({ email });

			if (userDB) {
				done(null, false);
			}
			const newUser = {
				first_name: profile._json.name.split(' ')[0],
				email,
				password: ' ',
			};
			const newUserDB = await usersModel.create(newUser);
			done(null, newUserDB);
		}
	)
);

//
// JWT
//

passport.use(
	'jwt',
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: secretKeyJWT,
		},
		async (jwt_payload, done) => {
			console.log(jwt_payload);
			done(null, jwt_payload);
		}
	)
);

//
// Independientemente de la estrategia hay que crear 2 funcions
//
// recibe toda la info del usuario y solo utiliza el id
passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (error) {
		done(error);
	}
});
//
// busca la info a partir del id del usuario
passport.deserializeUser(async (id, done) => {
	try {
		const user = await usersModel.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
