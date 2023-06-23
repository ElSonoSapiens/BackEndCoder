import { program } from 'commander';
import dotenv from 'dotenv';

program
	.option('-m, --mode <mode>', 'ambiente a trabajar', 'development')
	.option('-d, --debug <debug>', 'variable para modo debug', false)
	.option('-p,--port <port>', 'Puerto del servidor', 3000)

	.parse(process.argv);

  
console.log(program.opts());
//console.log(program.args);

dotenv.config();
console.log(process.env.PORT);




export default program;
