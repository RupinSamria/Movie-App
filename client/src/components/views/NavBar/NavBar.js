import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/NavBar.css';

function NavBar() {
  const [ visible, setVisible ] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return(
    <nav className='menu' style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className='menu_logo'>
        <a href='/'>Logo</a>
      </div>
      <div className='menu_container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>
        <Button
          className='menu_mobile-button'
          type='primary'
          onClick={showDrawer}
        >
          <Icon type='align-right' />
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
