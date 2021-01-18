import styles from './Search.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Search from '../../Search/search';
import {useState} from 'react';
const search = (props) => {
    const [data,setData] = useState([])
    const [search,setSearch] = useState("")
    
    function onChange(e){
         var HOST = process.env.NEXT_PUBLIC_HOST;
        var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
        if(e.target.value != ""){
            setSearch(e.target.value)
            var offset = 0;
            var limit = 10;
            fetch(PROTOCOL+"://"+HOST+"/api/search?search="+e.target.value+"&offset="+offset+"&limit="+limit).then(res => res.json()).then(data =>{
                var newArray = data.results
                setData(newArray)

        })
        }else{
            setData([])
        }
    }
    let style = [styles.Search];
    
    let inputstyle = [styles.input];
    {props.input ?  inputstyle.push(props.input) : null}
    {props.styles ?  style.push(props.styles) : null}
    return (
        <Aux>
            <div className={style.join(' ')}>
                <div className={styles.lupica}>
                    <img src="/search.png" alt=""/>
                </div>
                <input onChange={e => onChange(e)} className={inputstyle.join(' ')} type="text" placeholder="Pretrazite..."/>
                <Search styles={props.input} search={search}  data={data}/>
            </div>
            
        </Aux> 
    )
}

export default search;