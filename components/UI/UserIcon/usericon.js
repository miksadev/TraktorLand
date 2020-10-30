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
		var HOST = process.env.NEXT_PUBLIC_HOST;
        var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
		fetch(PROTOCOL+'://'+HOST+'/api/proxy/checkauth').then(res => res.json()).then(data => {
			
			if(data.result == "Success"){
				this.setState({url:'/user'})
			}else{
				this.setState({url:'/login'})
			}
		})
	}

	
    render(){
		let style = [styles.usericon];
	{this.props.styles ? style.push(this.props.styles) : null}
    	return(
        <Link href={this.state.url}><img onClick={this.props.click} className={style.join(' ')} src="/header/user.png" alt=""/></Link>
    );
    }
}

export default usericon;