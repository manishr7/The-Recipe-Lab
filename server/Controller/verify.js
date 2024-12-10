import jwt from 'jsonwebtoken';
export const verify = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
      }
    try {
        const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token; 
        jwt.verify(actualToken, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Access granted!'});
        console.log('Access granted!')
    } catch (error) {
      console.log('Invalid or expired token.')
      return res.status(403).json({ message: 'Invalid or expired token.' });
      
    }
  };