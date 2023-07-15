import winston from 'winston';

// debug http info warn error fatal

const customLevels = {
	levels: {
		debug: 0,
		http: 1,
		info: 2,
		warn: 3,
		error: 4,
		fatal: 5,
	},
	colors: {
		debug: 'magenta',
		http: 'green',
		info: 'blue',
		warn: 'yellow',
		error: 'orange',
		fatal: 'red',
	},
};

winston.addColors(customLevels.colors);

// logger desarrollo
// desde nivel debug

//
//
//

// logger produccion
// desde info

const logger = winston.createLogger({
	levels: customLevels.levels,
	transports: [
		new winston.transports.Console({
			level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		}),
		new winston.transports.File({
			filename: 'logs/errors.log',
			level: 'error',
			format: winston.format.json(),
		}),
	],
});

// archivo nivel error
// errors.log

export default logger;
