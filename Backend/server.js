const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env'});

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successfull');
}).catch(err => {
    console.error("Connection error: ", err);
});

// Define Mongoose Models
const Word = mongoose.model('Word', new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 5
    },
    clue: {
        type: String,
        required: true,
        trim: true
    }
}), '5letterWords');

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    solved: [String],
    score: { type: Number, default: 0 }
}), 'Users');

// API for user signup
app.post('/users/signup', async (req, res) => {
    const { name, password } = req.body;

    if(!name || !password) {
        return res.status(400).send("Name and password are required");
    }

    try {
        const existingUser = await User.findOne({ name: name });
        if(existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new User({ name, password, solved: [] });
        await newUser.save();
        res.send("User Registered Successfully");
    } catch (error) {
        console.log("Error during signup", error);
        res.status(500).send("Error during signup");
    }
});

// API for user login
app.post('/users/login', async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password) {
        return res.status(400).json({ message: "Name and password are required" });
    }

    try {
        const user = await User.findOne({ name: name, password: password });
        if(user) {
            res.json({ pos: true, score: user.score });
        } else {
            res.json({ pos: false, score: 0 });
        }
    } catch (error) {
        console.error("Error during login", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// API to fetch a word not in the user's solved list
app.get('/getword', async (req, res) => {
    const { name } = req.query; // Extract name from query parameters

    if (!name || name === 'Guest') {
        try {
            const count = await Word.countDocuments(); // Get the count of documents
            if (count === 0) {
                return res.status(404).json({ message: "No word found" });
            }

            const randomIndex = Math.floor(Math.random() * count); // Generate a random Index
            const wordDoc = await Word.findOne().skip(randomIndex); // Skip to the random index

            if (wordDoc) {
                res.json({
                    word: wordDoc.word,
                    clue: wordDoc.clue
                });
            } else {
                res.status(404).json({ message: "No word found" });
            }
        } catch (error) {
            console.error("Error fetching word", error); // Fixed: was 'err' but should be 'error'
            res.status(500).json({ message: "Error fetching word" });
        }
    } else {
        try {
            const user = await User.findOne({ name: name });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const count = await Word.countDocuments({ word: { $nin: user.solved } }); // Changed 'which' to 'word'
            if (count === 0) {
                return res.status(404).json({ message: "No word found" });
            }

            const randomIndex = Math.floor(Math.random() * count);
            const wordDoc = await Word.findOne({ word: { $nin: user.solved } }).skip(randomIndex); // Changed 'which' to 'word'

            if (wordDoc) {
                res.json({
                    word: wordDoc.word,
                    clue: wordDoc.clue
                });
            } else {
                res.status(404).json({ message: "No word found" });
            }
        } catch (error) {
            console.error("Error fetching word", error);
            res.status(500).json({ message: "Error fetching word" });
        }
    }
});

// API to add a word to the user's solved array
app.post('/users/:name/solved', async (req, res) => {
    const { name } = req.params;
    const { word } = req.body;

    if(name !== 'Guest') {
        try {
            // Find the user by name
            const user = await User.findOne({ name: name });
            if(!user) {
                return res.status(404).send("User not found");
            }

            // Check if the word is already in the solved array
            if(user.solved.includes(word)) {
                return res.status(400).send("Word already solved");
            }

            // Add the word to the solved array
            user.solved.push(word);
            user.score += 1;

            // Save the updated user document
            await user.save();

            res.send("Word added to solved list");
        } catch (error) {
            console.error("Error updating solved words", err);
            res.status(500).send("Error updating solved words");
        }
    } else {
        console.log("Guest no addition required");
    }
});

app.get("/getscore", async (req, res) => {
    const { name } = req.query;
    if(name !== 'Guest') {
        try {
            // Find the user by name
            const user = await User.findOne({ name: name });
            if(!user) {
                return res.status(404).send(`User not found ${name}`);
            }
            
            // Return the user's score
            res.json({ score: user.score });
        } catch (error) {
            console.error("Error fetching score", error);
            res.status(500).send("Something went wrong");
        }
    }
});

app.post("/setscore", async (req, res) => {
    const { name } = req.query; // Get name from the request body
    try {
        // Find the user by name
        const user = await User.findOne({ name: name });
        if(!user) {
            return res.status(404).send("User not found");
        }

        //Increment the score by 1
        user.score += 1;
        
        // Save the updated user document
        await user.save();
        res.send("Score incremented successfully");
    } catch (error) {
        console.log("Error updating score", error);
        res.status(500).send("Something went wrong");
    }
});

// API to get the top 5 users by score
app.get("/leaderboard", async (req, res) => {
    try {
        // Find all users, sort them by score in descending order, and limit the results to the top 5
        const topUsers = await User.find().sort({ score: -1 }).limit(5).select('name score');
        res.json(topUsers);
    } catch (error) {
        console.error("Error fetching leaderboard", err);
        res.status(500).send("Something went wrong");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log('Server started on port', port);
});