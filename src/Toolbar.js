import React, { Component } from 'react'

class Toolbar extends Component {
  render () {
    return (
      <div id='Toolbar' className='no-print'>
        <input type='file' id='text-input' />
        <i className='fas fa-file-alt' onClick={this.props.toggleModal('input')} />
        <a href='https://github.com/Elantris/md2pp' target='_blank' rel='noopener noreferrer'><i className='fab fa-github' /></a>
      </div>
    )
  }
}

export default Toolbar
