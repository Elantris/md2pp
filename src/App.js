import React, { Component } from 'react'
import MarkdownIt from 'markdown-it'
import meta from 'markdown-it-meta'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'
import Toolbar from './Toolbar'

let md = new MarkdownIt({
  html: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return ''
  }
})
md.use(meta).use(footnote)

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      course: { __html: '' },
      author: { __html: '' },
      content: { __html: '' },
      footer: { __html: '' },
      modalShow: ''
    }

    this.updateContent = this.updateContent.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount () {
    window.fetch('./README-Template.md')
      .then(res => res.text())
      .then(this.updateContent)
  }

  updateContent (text) {
    let content = md.render(text)

    this.setState({
      content: { __html: content },
      course: { __html: md.meta.course || '' },
      author: { __html: md.meta.author || '' },
      footer: { __html: md.render(md.meta.footer || '') },
      modalShow: ''
    })

    md.meta = {}
  }

  toggleModal (modal) {
    return event => {
      this.setState({
        modalShow: modal || ''
      })
    }
  }

  handleSave (event) {
    this.updateContent(this.refs.raw.value)
  }

  render () {
    return (
      <div id='App'>
        <Toolbar toggleModal={this.toggleModal} />

        <div className='container markdown-body'>
          <div className='pure-g'>
            <div className='pure-u-1-2' dangerouslySetInnerHTML={this.state.course} />
            <div className='pure-u-1-2 text-right' dangerouslySetInnerHTML={this.state.author} />
          </div>
          <div className='pure-g'>
            <div className='pure-u-1' dangerouslySetInnerHTML={this.state.content} />
          </div>
          <footer dangerouslySetInnerHTML={this.state.footer} />
        </div>

        <div className={`modal ${this.state.modalShow === 'input' ? 'active' : ''}`}>
          <div className='modal-container'>
            <textarea
              placeholder='Markdown Text'
              ref='raw'
            />
            <div className='text-right'>
              <button className='pure-button' onClick={this.toggleModal('')}>Cancel</button>
              {' '}
              <button className='pure-button pure-button-primary' onClick={this.handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
