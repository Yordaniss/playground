const jwt = require('jsonwebtoken');

function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(req.headers['authorization'])
    if (token == null) return res.status(400).json({ success: false, message: 'Token is null' });

    jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: any) => {

        if (err) return res.status(403).json({ success: false, error: err });

        req.user = user;

        next();
    })
}

export default authenticateToken;