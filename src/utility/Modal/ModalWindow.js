import React, { useState } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';
import { Dialog } from '@mui/material';




const ModalWindow = ({siteModal, openModal}) => {
    const [openModalWindow, setOpenModalWindow] = useState(`${siteModal.openClose === 'open' ? true : false}`)
    const handleClose = () => {
       setOpenModalWindow(`${siteModal.openClose === 'closed' ? true : false}`);
    };
        return(
            <Dialog open={Boolean(openModalWindow)}
            onClose={handleClose}
            style={{display: `${siteModal.openClose === 'open' ? 'block' : 'none'}`}}
            >
               <Box sx={{display: 'flex', flexDirection: 'column'}}>
                 <Box sx={{display: 'flex',justifyContent: 'flex-end'}}>
                        <Close onClick={() => {openModal('closed', '')}}/>
                    </Box>
                    <Box>
                        {siteModal.content === 'Login' ? <Login/> : <SignUp/>}
                    </Box>
                </Box>       
            </Dialog>
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

export default connect(mapStateToProps,mapDispatchToProps)(ModalWindow)
