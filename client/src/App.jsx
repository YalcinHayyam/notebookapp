// gerekli kütüphaneler
import React from 'react'
import axios from 'axios'
import * as uuid from 'uuid'
import Item from './components/Item'
class App extends React.Component {
    //  Sınıfın state yönetimi
    state = {
        // Boş dizi Koruması
        notes: [{
            id: "temp_id_xxx", doc: "temp", content: "temp dosyası önceden oluşturulmuş not varsa silinicektir!! Eğer yoksa yenisini oluşturmak için " +
                " sol kısımda bulunan alana not adı girip yeni not oluştur butonuna tıklayınız ardından eğer kaydetmek isterseniz kaydet butonuna basarak dosyanızı kaydedebilirsini "
        }],
        newNote: "",
        area: "",
        selectedIndex: 0
    }
    // Objeler yerleşince oluşacak işlemler verinin sunucudan getirilmesi ve state in doldurulması
    componentDidMount = () => {
        axios.get('http://localhost:4000').then(res => {
            // Boş dizi koruması
            if (res.data.length > 0) {
                this.setState(() => {
                    console.log(res.data)
                    return {
                        notes: res.data,
                    }
                })
            }
        }).then(() =>
            this.setState((state) => {
                return { area: state.notes[0].content }
            })
        )
    }
    // Kayedtme ve sunucuya gönderme işlemi
    save = (e) => {
        e.preventDefault()

        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            // data[state.selectedIndex].content = e.target.value
            return { notes: data }
        })
        // ------------------------------------------- axios.post('http://localhost:4000', this.state.notes[this.state.selectedIndex])
        var tempGuard = this.state.notes.filter(note => note.id != "temp_id_xxx")
        axios.post('http://localhost:4000', { noteList: tempGuard })

        // --------------------------------------------console.log(typeof (tempGuard))
        // --------------------------------------------console.log(this.state)
        // --------------------------------------------this.setState((state) => {
        // --------------------------------------------    return { notes: [{ a: state.notes }] }
        // --------------------------------------------})
    }
    // Seçili notun değiştirilme işlemi yapılan ayarlamalar
    changeSelected = (e, id) => {
        // sayfanın refresh olması önleme
        e.preventDefault()
        // index alma ve atama
        var note = this.state.notes.find(n => n.id == id)
        var index = this.state.notes.indexOf(note)


        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            // data[state.selectedIndex].content = e.target.value
            return { notes: data }
        })
        // state yönetimi
        this.setState((state) => { return { area: state.notes[index].content, selectedIndex: index } })
    }




    // // Text Area değişikliğinin yakalanması ve ayarlamalar
    // // Biraz kötü oldu kusura bakmayın 
    // handleOnChange = (e) => {
    //     e.preventDefault()
    //     this.setState((state) => {
    //         var data = state.notes
    //         data[state.selectedIndex].content = state.area
    //         // data[state.selectedIndex].content = e.target.value
    //         return { area: e.target.value, notes: data }
    //     })
    //     // console.log(this.state.notes[this.state.selectedIndex].content)
    // }


    // Text Area değişikliğinin yakalanması ve ayarlamalar
    handleOnChange = (e) => {
        e.preventDefault()
        this.setState({ area: e.target.value })
        // console.log(this.state.notes[this.state.selectedIndex].content)
    }


    // Yeni notun oluşturulması ve ayarlamalar
    create = (e) => {
        e.preventDefault()
        // not adının girilip girilmediğinin kontrolü
        if (this.state.newNote != "") {
            // tempGuard ilk oluşturmada oluşan notun içeriğinin 'content' kısmının boş gelmesi hatası düzeltimi 
            // sunucuya yazdığımız temp kodunun gitmemesi için kontrol
            this.setState((state) => {
                var tempGuard = this.state.notes.filter(note => note.id != "temp_id_xxx")
                // console.log("teampGuard ", tempGuard)
                state.notes = tempGuard
                state.selectedIndex = state.notes.length
                state.area = ""
                // yeni not için ayarlamalar ve hazırlıklar
                return state.notes = [...state.notes, { id: uuid.v4(), doc: state.newNote + ".md", content: "" }]

            }
            )


            //------------------------------------   tempGuard ?? this.setState({notes : this.state.notes.filter(note => note.id != "temp_id_xxx")})
            //------------------------------------   this.setState({notes : this.state.notes.filter(note => note.id == "temp_id_xxx")})
            // Not oluşturulduktan sonra ad bloğunun temizlenmesi
            this.setState({ newNote: "" })
        }
        else {
            // Not adı kontrolü
            alert("Not Adı Girilmedi !!!")
        }
        // -------------------------------------------- console.log( "filtrelenmiş veriler", this.state.notes.filter(note => note.id = "temp_id_xxx"))
    }
    // Render işlemi
    render = () => {
        return (
            <div className="container">

                <br />
                <br />
                <br />
                <br />

                <div className="row">
                    <div className="col">
                        <div className="row">
                            <h5 className="card-title">Yeni Not</h5>
                            <br />
                            {/* Yeni not adı input */}
                            <input type="text" placeholder="Not adı giriniz" className="form-control" style={{ width: 200 }} value={this.state.newNote} onChange={(e) => this.setState({ newNote: e.target.value })} />
                            {/* Yeni not oluşturma butonu  */}
                            <button className="form-control btn btn-danger" style={{ width: 100 }} onClick={e => this.create(e)}>Yeni Not</button>
                        </div>
                        <br />

                        <div className="row">
                            <h5 className="card-title">Notlar</h5>

                            {/* Her not için buton oluşturma */}
                            {this.state.notes.map((note, index) => <Item changeSelected={this.changeSelected} key={index} id={note.id} note={note} />)}
                        </div>
                    </div>
                    <div className="col">
                        {/* Text Area */}
                        <h5 className="card-title">Not İçeriği</h5>
                        <textarea className="form-control" placeholder="Notunuzu giriniz" style={{ width: 300 }} onChange={(e) => this.handleOnChange(e)} name="" id="" cols="20" value={this.state.area} rows="10"></textarea>
                    </div>
                    <div className="col">
                        {/* Kaydetme butonu */}
                        <h5 className="card-title">Kaydet</h5>
                        <button className="btn btn-success" style={{ width: 300 }} onClick={(e) => this.save(e)}>Kaydet</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default App