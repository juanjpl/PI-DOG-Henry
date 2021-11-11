import { useDispatch } from "react-redux"
import { ASCENDENTE, DESCENDENTE ,API , DB , LOWWEIGHT, UPWEIGHT , ALL } from "../../constantes/sort"
//from "../constantes/sort"
import { sort , filterCreated} from "../../store/actions"

export default function Order(){

    let dispatch = useDispatch()

    function onSelectAZ(e){
        //console.log(e.target.value)
        dispatch(sort(e.target.value))
    }

    function onSelectLow(e){
        //console.log(e.target.value)
        dispatch(sort(e.target.value))
    }

    function onSelectDB(e){
        //console.log(e.target.value)
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div>
           <select name="select" onChange={onSelectAZ} >
               <option value={ASCENDENTE}>A to Z</option>
               <option value={DESCENDENTE} >Z to A</option>
           </select>

           <select name="select" onChange={onSelectDB} >
               <option value={API}>DOG API</option>
               <option value={DB} >DOG DATABASE</option>
               <option value ={ALL} >Todos</option>
               
           </select>

           <select name="select" onChange={onSelectLow} >
               <option value={LOWWEIGHT}>DOWN WEIGHT</option>
               <option value={UPWEIGHT} >UP WEIGHT</option>
               <option value ={ALL }>Todos</option>
              
           </select>
        </div>

        
    )
}