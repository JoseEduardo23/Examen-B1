// Punto de arranque de todo el web server
import app from './server.js'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));