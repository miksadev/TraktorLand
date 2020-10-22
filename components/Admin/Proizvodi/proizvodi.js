import React from 'react';
import styles from './proizvodi.module.css';
import Proizvod from './Proizvod/proizvod';

class proizvodi extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            allPro:[]
        }
    }
    refreshData(){
         fetch('/api/get').then(res => res.json()).then(data => {
            this.setState({allPro:data})

        })
    }
    componentDidMount(){
        fetch('/api/get').then(res => res.json()).then(data => {
            this.setState({allPro:data})
            this.setState({loading:false})
            
        })
    }
    render(){
        var content;
        if(this.state.loading){
            content =<h3 style={{textAlign:"center"}}>LOADING</h3>
        }else{
            content = this.state.allPro.map((key,num) => <Proizvod refresh={e => this.refreshData(e)} key={key['id']} id={key['id']} sifra={key["sifra"]} src={key["thumb"]} name={key["ime"]} price={key["mp_cena"]} kolicina={key['kolicina']} url={'/admin/proizvodi/edit?id='+key['id']}></Proizvod>)
        }
        return (
        <div className={styles.proizvodi}>
                {content}
        </div>
        );
    }
}


export default proizvodi;