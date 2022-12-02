import { Dialog, DialogContent} from '@mui/material'
import React from 'react'
import Application from './Application'

function Popup({openPopup,setOpenPopup}) {
  return (
    <>
       <Dialog open={openPopup} scroll='body'>
         <DialogContent>
               <Application setOpenPopup={setOpenPopup}/>
         </DialogContent>
       </Dialog>
    </>
  )
}

export default Popup