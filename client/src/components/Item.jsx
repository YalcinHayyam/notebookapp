
export default function Item(props) {

    return (
        <div>
            {/* Seçili notu değiştirme metodu çağırrma ve not adı  */}
            <button className="btn btn-primary" style={{width : 300}} onClick={(e)=>props.changeSelected(e,props.id)}>{props.note.doc}</button>
        </div>
    )
}
