import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './Modal.css';
import openModal from '../../actions/openModal';

function Modal(props){
    console.log(props, 'from MODAL')
    let modalInlineStyle
    if(props.siteModal.openClose === 'open'){
        modalInlineStyle = {display: "block"}
    } else {
        modalInlineStyle = {display: "none"}
    }
    

    console.log(modalInlineStyle)
        return(
            <div className="site-modal" style={modalInlineStyle}>
                <div className="modal-content">
                    <div className="col right">
                        <span className="close" onClick={() => {props.openModal('closed', '')}}>&times;</span>
                    </div>
                    <div className=''>
                        {props.siteModal.content}
                    </div>
                </div>
            </div>
        )
    
}

function mapStateToProps(state){
    return{
        siteModal: state.siteModal
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal
    },dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal)
