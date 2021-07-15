import styles from '../../../../styles/add.module.css';
import Input from '../../../../components/UI/Input/input';
import Link from 'next/link';
import {useState} from 'react';
import Cookies from 'cookies';
export async function getServerSideProps({req,res}){
	var HOST = process.env.HOST;
        var PROTOCOL = process.env.PROTOCOL
		var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/login'})
             res.end();
        }
        await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => {
                user = data.user
            })
        	if(user.partnertype !== "admin"){
        		res.writeHead(307,{Location:'/login'})
             res.end();
        	}

	//----------------------------------------------------
	return {
		props:{
			data:[]
		}
	}
}
const AddAkcija = () => {
	const initialA = {
		ime:"",
		sifra:"",
		link_proizvoda:"",
		cena:"",
		popust:""
	}
	const initialAempty = {
		ime:false,
		sifra:false,
		link_proizvoda:false,
		cena:false,
		popust:false
	}
	const [data,setData] = useState(initialA)
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
		var HOST = process.env.NEXT_PUBLIC_HOST;
    	var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
		var err = 0
		var newdataempty = {...dataempty}
		for(let key in data){
			if(data[key] == ""){
				
				newdataempty[key] = true
				err++
			}
		}
		setDataempty(newdataempty)
		if(err == 0){
			if(e.target["thumb"].files.length == 0){
                alert("Upload image");
                return;
            }
		}else{
			return;
		}


		var formData = new FormData()
		formData.append("ime",data["ime"]);
		formData.append("sifra",data["sifra"]);
		formData.append("cena",data["cena"]);
		formData.append("link_proizvoda",data["link_proizvoda"]);
		formData.append("popust",data["popust"]);
		formData.append("thumb",e.target["thumb"].files[0]);
		fetch(PROTOCOL+'://'+HOST+'/api/addakcija',{
			method:"POST",
			body:formData
		}).then(res => res.json())
		.then(data => {
			if(data.result == "Success"){
				alert("Sacuvano")
				setData(initialA)
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
                <Input onFocus={(e) => onFocus(e)} style={dataempty.cena ? {borderBottom:'1px solid red'} : {}} onChange={(e) => onChange(e)} inputtype="input" value={data.cena} name="cena"  label="Cena"  type="text"/>
                <Input onFocus={(e) => onFocus(e)} style={dataempty.popust ? {borderBottom:'1px solid red'} : {}} onChange={(e) => onChange(e)} inputtype="input" value={data.popust} name="popust"  label="Cena sa popustom"  type="text"/>

                <button type="submit" className={styles.submit}>ADD</button>
            </form>
            <Link href="/admin/akcija"><h2 className={styles.nazad}>{"< Nazad"}</h2></Link>
            
            
            
        </div>
    );
		


}
export default AddAkcija;
