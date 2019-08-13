import React from 'react'
import AttachmentSVG from '../svgs/attachment'

export default class Attachment extends React.Component {

  constructor (props) {
    super(props)
  }

  handleChange = (e) => {
    const { accept, postAttach, onAttach, imgUrlPath } = this.props
    const data = new FormData()
    data.append('file', e.target.files[0])
    onAttach(imgUrlPath, data)
      .then((response) => {
        let payload = response.message.imageUrl
        postAttach(payload)
      })
  }

  render () {
    const { name, accept } = this.props

    return (
      <div
        className='RecastAttachmentContainer CaiAttachmentContainer'
      >
        <div className='RecastAttachmentButton CaiAttachmentButton'>
          <div className='button'>
            <label htmlFor='cai-attachment'>
              {<AttachmentSVG/>}
            </label>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={input => (this.thisInput = input)}
              id='cai-attachment'
              name={name}
              accept={accept}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
