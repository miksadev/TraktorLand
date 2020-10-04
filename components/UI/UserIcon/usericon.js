import React from 'react';
import styles from './usericon.module.css';
import Link from 'next/link';

class usericon extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			url:''
		}
	}
	componentDidMount(){
		fetch('/api/proxy/checkauth').then(res => res.json()).then(data => {
			
			if(data.result == "Success"){
				this.setState({url:'/user'})
			}else{
				this.setState({url:'/login'})
			}
		})
	}
    render(){
    	return(
        <Link href={this.state.url}><img className={styles.usericon} src="/header/user.png" alt=""/></Link>
    );
    }
}

export default usericon;