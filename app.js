const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key';
app.use(express.json());
const users = [];
// Signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Name, email and password are required'
        });
    }
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };
    users.push(user);
    res.status(201).json({
        message: 'User registered successfully'
    });
});
// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token required'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}
app.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Protected resource accessed successfully',
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});