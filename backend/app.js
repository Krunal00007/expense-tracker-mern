
const express = require('express')
const cors = require('cors')
const { db } = require('./database/db')
const {readdirSync} = require('fs')
const { route } = require('./routes/transations')
const authRoutes = require("./routes/auth");
const app = express()

require('dotenv').config()
const port = process.env.PORT

const adminRoutes = require("./routes/admin")



//middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes)
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

//routes
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

const server = () => {
    db()
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

server()