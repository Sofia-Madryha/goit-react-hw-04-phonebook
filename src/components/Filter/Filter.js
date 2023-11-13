export const Filter = ({name, filterContacts})=>{
    return (
        <div>
            <input  value ={name} type="text"
            onChange={evt=>filterContacts(evt.target.value)}/>
        </div>
    )
}