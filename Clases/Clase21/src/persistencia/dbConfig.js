import mongoose from 'mongoose';

// mongoose.connect(
// 	'mongodb+srv://elSonoSapiens:2xyjhtHqPvGEOdZG@cluster0.eu8lqfi.mongodb.net/mongoSession?retryWrites=true&w=majority',(error)=>{
//     if(error){
//       console.log(error)
//     }else {console.log("Conectado a la D B"); }
//   }
// );

try {
	await mongoose.connect(
		'mongodb+srv://elSonoSapiens:2xyjhtHqPvGEOdZG@cluster0.eu8lqfi.mongodb.net/mongoSession?retryWrites=true&w=majority'
	);
	console.log('Conectado a DB');
} catch (error) {
	console.log(error);
}
