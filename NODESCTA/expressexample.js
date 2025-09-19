const express = require('express');
const app = express();
const port = 3003;

app.listen(port, () => 
{
    console.log(`Server is listening on port ${port}`);
})

app.get('/', (req, res) => 
{
    res.send("Welcome to first server");
}
)
app.get('/greeting', (req, res) => 
{
    res.send("Very good morning!");
});

app.get('/bye', (req, res) => 
{
    res.send("ok Its 11 you can go for break!")
});
