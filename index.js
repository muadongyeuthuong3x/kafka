var express = require('express');
const app = express();
const { Kafka } = require('kafkajs');
const { io } = require("socket.io-client");
const Binance = require('node-binance-api');
const binance = new Binance().options({

});
app.use(express.json());

const socket = io('wss://d2be-58-187-249-46.ap.ngrok.io');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092'],
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })


binance.futuresMiniTickerStream(async (miniTicker) => {
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: JSON.stringify(miniTicker) },
        ],
    });
})


const getSocker = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(33333333444333) 
        },
    })
}
getSocker()


app.get('/', (req, res) => {
    res.send('s234234fsrretrdf23ffffs');
})
// ConnectKafka();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})