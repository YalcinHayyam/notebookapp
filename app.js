// Gerekli kütüphaneler
const express = require('express')
const app =express()
const noteCntrl = require('./controllers/notebookController')
const path =require("path")
// cors sertifikası
const cors =require('cors')
// port ayarı ve diğer yapılandırma middlewarelar
const port = 4000 | process.env.PORT
app.use(express.static(path.join(__dirname, 'notebooks')))
app.use(express.json())
app.use(cors())
app.use(noteCntrl)
// Sunucu başlatma
app.listen(port,()=>{
    console.log(`Server started on port : ${port}`)
})
