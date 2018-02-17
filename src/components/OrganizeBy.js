import React, { Component }from 'react';

class OrganizeBy extends Component{
    componentDidMount(){
        console.log('organizeby props: ', this.props)
    }
    // handleOnClick(e){
    //     console.log(e)
    // }
    render(){
        let buttons = this.props.buttons.map((button, i)=>{
            return (
                <button 
                 stateArray={button.stateArray} 
                 order={button.order} 
                 key={i} 
                 onClick={(e)=>this.props.handleOrganizeBy(button.stateArray, button.order)} >
                 {button.name}
                 </button>
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