import { connect } from 'mongoose';
import { loadEnvFile } from 'process';

loadEnvFile('.env');

// depois tem que ver como carregar a conexão do banco da forma correta
console.log('MONGO_URL:', process.env.MONGO_URL);
async function main() {
	try {
		await connect(process.env.MONGO_URL!);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(error);
	}
}

void main();
