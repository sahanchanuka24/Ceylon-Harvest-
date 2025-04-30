const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5;
    let retryCount = 0;

    const connectWithRetry = async () => {
        try {
            const mongoURI = 'mongodb+srv://admin:2npps70yajmpiK2q@cluster0.gf62g.mongodb.net/vegetable_shop?retryWrites=true&w=majority';
            
            console.log(`Attempting to connect to MongoDB... (Attempt ${retryCount + 1}/${maxRetries})`);
            
            const conn = await mongoose.connect(mongoURI, {
                serverSelectionTimeoutMS: 30000, // 30 seconds
                socketTimeoutMS: 45000,
                family: 4, // Use IPv4, skip trying IPv6
                maxPoolSize: 10,
                minPoolSize: 5,
                retryWrites: true,
                w: 'majority'
            });

            console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);

            // Handle connection errors after initial connection
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying connection... (${retryCount}/${maxRetries})`);
                    setTimeout(connectWithRetry, 5000);
                }
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(connectWithRetry, 5000);
                }
            });

        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying connection in 5 seconds... (${retryCount}/${maxRetries})`);
                setTimeout(connectWithRetry, 5000);
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                process.exit(1);
            }
        }
    };

    await connectWithRetry();
};

module.exports = connectDB; 