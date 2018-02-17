import React, { Component }from 'react';

class OrganizeBy extends Component{
    componentDidMount(){
        console.log('organizeby props: ', this.props)
    }
    handleOnClick(title, type){
        console.log(title, type)
    }
    
    render(){
        let buttons = this.props.buttons.map((button, i)=>{
            return (
               // <button title={button.name} value={button.value} key={i} onClick={(e)=>{this.props.handleOrganzieBy(e.target.title, e.target.value)}}>{button.name}</button>
                <button title={button.name} value={button.value} key={i} onClick={(e)=>this.props.handleOrganizeBy(e.target.title, e.target.value)} >{button.name}</button>
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