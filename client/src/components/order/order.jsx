import { useDispatch } from "react-redux"
import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort"
//from "../constantes/sort"
import { sort } from "../../store/actions"

export default function Order(){

let dispatch = useDispatch()

    function onSelectChange(e){
        //console.log(e.target.value)
        dispatch(sort(e.target.value))

    }

    return(
        <div>
           <select name="select" onChange={onSelectChange} >
               <option value={ASCENDENTE}>A to Z</option>
               <option value={DESCENDENTE} >Z to A</option>
               <option value="valor2" >valor 3</option>
           </select>
        </div>
    )
}