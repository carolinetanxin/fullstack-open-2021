
const Filter = (props) => {

    return(
        <div>
            filter shown with <input value={props.newFilterName} onChange={props.filterNameChange}/>
        </div>
    )
}

export default Filter;
