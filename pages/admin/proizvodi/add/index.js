import React from 'react';
import styles from '../../../../styles/add.module.css';
import Input from '../../../../components/UI/Input/input';
import Link from 'next/link';
import Cookies from 'cookies';
class add extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
                data:{
                        ime:'',
                        proizvodjac:'',
                        kataloski_broj:'',
                        sifra:'',
                        mp_cena:'',
                        
                        tip:'Traktori',
                        zemlja_porekla:'',
                        kolicina:''
                    },
                imeEmpty:false,
                proizvodjacEmpty:false,
                kataloski_brojEmpty:false,
                sifraEmpty:false,
                mp_cenaEmpty:false,
                
                tipEmpty:false,
                kolicinaEmpty:false
        }
    }
    onChange(e){
        var name = e.target.name
        var obj = {...this.state}
        obj.data[e.target.name] = e.target.value
        this.setState({obj})
        
    }
    onFocus(e){
        var obj = {};
        var key = e.target.name;
        obj[key+"Empty"] = false
        this.setState(obj)
    }
    onSubmit(e){
        e.preventDefault();
        var HOST = process.env.NEXT_PUBLIC_HOST;
        var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
        var err = 0;
        for(const [key,value] of Object.entries(this.state.data)){
            if(value == ""){
                if(key != "zemlja_porekla"){
                    var obj = {};
                obj[key+"Empty"] = true
                this.setState(obj)
                 
                err++;
                }
            }
        }
        var imgThumb;
        if(e.target["thumb"].files.length == 0){
                imgThumb = "default";
        }else{
                imgThumb = e.target["thumb"].files[0];
        }
        if(err != 0){
            
            return;
        }
        

        var formData = new FormData();
        formData.append("ime",this.state.data.ime);
        formData.append("proizvodjac",this.state.data.proizvodjac);
        formData.append("kataloski_broj",this.state.data.kataloski_broj);
        formData.append("mp_cena",this.state.data.mp_cena);
        
        formData.append("tip",this.state.data.tip);
        formData.append("sifra",this.state.data.sifra);
        formData.append("zemlja_porekla",this.state.data.zemlja_porekla);
        formData.append("kolicina",this.state.data.kolicina);
        formData.append("thumb",imgThumb);
        fetch(PROTOCOL+"://"+HOST+"/api/add",{
            method:"POST",
            body:formData
        }).then(res => res.json()).then(data =>{
            if(data["result"] == "Success"){
                alert("Success")
                this.setState({data:{
                        ime:'',
                        proizvodjac:'',
                        kataloski_broj:'',
                        sifra:'',
                        mp_cena:'',
                        
                        tip:'traktori',
                        
                        kolicina:''
                    }})
            }
        })
        
        
        
    }
    render(){
        return (
        <div className={styles.proizvodi}>
            <div className={styles.heading}>
                <h3>Proizvodi</h3>
            </div>
            <form className={styles.additemforma} onSubmit={(e)=>this.onSubmit(e)} encType="multipart/form-data">
                <input  name="thumb" className={styles.inputfile} type="file"/>
                <img className={styles.upload} src="/admin/upload.png" alt=""/>
                <br />
                
                <Input  label="Tip" inputtype="select" name="tip" value={this.state.data.tip} onChange={(e) => this.onChange(e)}>
                    <option value="traktori" >Traktori</option>
                    <option value="beraci">Beraci</option>
                    <option value="kombajni">Kombajni</option>
                    <option value="freze">Freze</option>
                    <option value="delovi">Delovi za poljoprivredne masine</option>
                    <option value="mehanizacija">Poljoprivredna mehanizacija</option>
                </Input>
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.imeEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.ime}  name="ime"  label="Ime"  type="text"/>
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.proizvodjacEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.proizvodjac} name="proizvodjac"  label="Proizvodjac"  type="text"/>
                <Input onFocus={(e) => this.onFocus(e)} style={{}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.zemlja_porekla} name="zemlja_porekla"  label="Zemlja porekla"  type="text"/>
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.kataloski_brojEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.kataloski_broj} name="kataloski_broj"  label="Kataloski broj"  type="text"/>
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.sifraEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.sifra} name="sifra"  label="Sifra"  type="text"/>
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.mp_cenaEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.mp_cena} name="mp_cena"  label="MP cena"  type="text"/>
                
                <Input onFocus={(e) => this.onFocus(e)} style={this.state.kolicinaEmpty ? {borderBottom:'1px solid red'} : {}} onChange={(e) => this.onChange(e)} inputtype="input" value={this.state.data.kolicina} name="kolicina"  label="Kolicina"  type="text"/>

                <button type="submit" className={styles.submit}>ADD</button>
            </form>
            <Link href="/admin/proizvodi"><h2 className={styles.nazad}>{"< Nazad"}</h2></Link>
            
            
            
        </div>
    );
    }
}
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
            if(user.rank !== "admin"){
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
export default add;
