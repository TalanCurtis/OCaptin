import React, { Component }from 'react';

class OrganizeBy extends Component{
    componentDidMount(){
        console.log(this.props)
    }
    handleOnClick(title){
        console.log(title)
    }
    
    render(){
        let buttons = this.props.buttons.map((button, i)=>{
            return (
                <button title={button} key={i} onClick={(e)=>{this.handleOnClick(e.target.title)}}>{button}</button>
            )
        })
        return(
            <div className='OrganizeBy'>
                {buttons}
            </div>
        )
    }
}

export default OrganizeBy;