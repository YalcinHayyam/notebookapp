// Gerekli Kütüphaneler
const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require("path")
// 3. parti unique id  üretici
const uuid = require('uuid')

// path konumu
var dir = path.join(path.dirname(require.main.filename), "notebooks")
// Router get isteği
router.get('/', (req, res) => {
    // Okunacak dosyalar için boş dizi init edilmiş
    var docsAndContents = [];
    // path deki dosyaların adını alma
    var docs = fs.readdirSync(dir)
    // path deki dosyaları gezip içeriğini okuma diziye aktarma
    docs.map(doc => {
        var content = fs.readFileSync(path.join(dir, doc), 'utf-8')
        docsAndContents.push({ id: uuid.v4(), doc, content })

    })
    // Diziyi gönerme
    res.send(docsAndContents)
})

// Router post işlemi

//---------------------------------------localhost return list but server takes object --- Solved ---
router.post('/', (req, res, next) => {
    // -----------------------------------var { doc } = req.body
    // -----------------------------------var { content } = req.body
    // -----------------------------------console.log(doc)
    // -----------------------------------console.log(content)
    
    // Body den gelen objeyi alma
    console.log(req.body)
    var {noteList} = req.body
    // ------------------------------------// var noteList = Array.of(noteList);
    // ------------------------------------var noteArray =  Object.values(noteList)
    // ------------------------------------console.log(noteArray)

    // ------------------------------------ console.log("notelist :", typeof (noteList))
    

    // -------------------------------------console.log(typeof(noteArray))
   
    // null koruması
     if (noteList !=null) {
       console.log("fonksiyon içi", noteList)
        // her nottaki değişikliğin güncellenmesi veya yeni not oluşturlduğunda eklenmesi
        noteList.map(note => {
            // ------------------------------console.log("note", note)
            fs.writeFileSync(path.join(dir, note.doc), note.content, 'utf-8')
        })
    }
    res.status(200).end()
    // --------------------------------------res.redirect("getNotes")
    // --------------------------------------console.log(req.body.noteList)

    // --------------------------------------fs.writeFileSync(path.join(dir, doc + ".md"), content, 'utf-8')
    // --------------------------------------res.redirect("getNotes")
})


// Module export işlemi
module.exports = router
