import React from 'react'

function Logo(styles={width:'', height:''}) {
  return (
     <div className='w-20 rounded-full overflow-hidden'>
        <img src="/Blog.png" alt="" style={styles}/>
     </div>
  )
}

export default Logo