import styles from '../../../../styles/add.module.css';
import Input from '../../../../components/UI/Input/input';
import Link from 'next/link';
import {useState} from 'react';
import Cookies from 'cookies';
export async function getServerSideProps({req,res,query}){
	var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
        await fetch('http://localhost:3000/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch('http://localhost:3000/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => {
                user = data.user
            })
        	if(user.rank !== "admin"){
        		res.writeHead(307,{Location:'/login'})
             res.end();
        	}

	//----------------------------------------------------

	var id = query.id
	const data = await fetch('http://localhost:3000/api/getakcije?id='+id)
	.then(res => res.json()).then(data => data)
	return {
		props:{
			akcije:data.data,
			id:id
		}
	}
}
const AddAkcija = ({akcije,id}) => {
	const initialA = {
		ime:"",
		sifra:"",
		link_proizvoda:""
	}
	const initialAempty = {
		ime:false,
		sifra:false,
		link_proizvoda:false
	}
	const [data,setData] = useState(akcije)
	const [dataempty,setDataempty] = useState(initialAempty)
	function onFocus(e){
		var newdataempty = {...dataempty}
		newdataempty[e.target.name] = false
		setDataempty(newdataempty)
	}
	function onChange(e){
		var newData = {...data}
		newData[e.target.name] = e.target.value
		setData(newData)
	}
	function onSubmit(e){
		e.preventDefault()
		var err = 0
		var newdataempty = {...dataempty}
		for(let key in data){
			if(data[key] == ""){
				
				newdataempty[key] = true
				err++
			}
		}
		setDataempty(newdataempty)
		var thumb;
		if(err == 0){
			if(e.target["thumb"].files.length == 0){
                thumb = "none";
            }else{
            	thumb = e.target["thumb"].files[0];
            }
		}else{
			return;
		}

		
		var formData = new FormData()
		formData.append("id",id);
		formData.append("ime",data["ime"]);
		formData.append("sifra",data["sifra"]);
		formData.append("link_proizvoda",data["link_proizvoda"]);
		formData.append("thumb",thumb);
		fetch('/api/editakcije',{
			method:"POST",
			body:formData
		}).then(res => res.json())
		.then(data => {
			if(data.result == "Success"){
				alert("Sacuvano")
			}
		})
		
	}
	return (
 			<div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Akcija</h3>
            </div>
            <form className={styles.additemforma} onSubmit={(e)=>onSubmit(e)} encType="multipart/form-data">
                <input  name="thumb" className={styles.inputfile} type="file"/>
                <img className={styles.upload} src="/admin/upload.png" alt=""/>
                <br />
                <Input onFocus={(e) => onFocus(e)} style={dataempty.ime ? {borderBottom:'1px solid red'} : {}} onChange={(e) => onChange(e)} inputtype="input" value={data.ime}  name="ime"  label="Ime"  type="text"/>
                <Input onFocus={(e) => onFocus(e)} style={dataempty.sifra ? {borderBottom:'1px solid red'} : {}} onChange={(e) => onChange(e)} inputtype="input" value={data.sifra} name="sifra"  label="Šifra"  type="text"/>
                <Input onFocus={(e) => onFocus(e)} style={dataempty.link_proizvoda ? {borderBottom:'1px solid red'} : {}} onChange={(e) => onChange(e)} inputtype="input" value={data.link_proizvoda} name="link_proizvoda"  label="Link proizvoda"  type="text"/>
                

                <button type="submit" className={styles.submit}>EDIT</button>
            </form>
            <Link href="/admin/akcija"><h2 className={styles.nazad}>{"< Nazad"}</h2></Link>
            
            
            
        </div>
    );
		


}
export default AddAkcija;