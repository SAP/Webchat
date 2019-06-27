import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html-react'

import { truncate } from 'helpers'

import './style.scss'

const Text = ({ content, style }) => {
  let respond, iframeSrc, iframeWidth, iframeHeight, iframeScroll

  if (typeof content === 'string') {
    respond = content
    if(respond.indexOf("iframe")!=-1){
       // var str = '<iframe src="/xi/ui/offcyclecomp/pages/spotAwardUserIndexMobile.xhtml" width="100%" height="400" scrolling="no"/>';
        var re ='<iframe src="(.*)" width="(.*)" height="(.*)" scrolling="(.*)"/>';
        var p = new RegExp(re, "gm");
        var myArray = respond.match(p);
        iframeSrc = RegExp.$1;
        iframeWidth = RegExp.$2;
        iframeHeight = RegExp.$3;
        iframeScroll = RegExp.$4;
        respond = respond.replace(p,'');
    }
  } else if (typeof content === 'object') {
    respond = JSON.stringify(content)
  } else if (typeof content === 'number') {
    respond = content.toString()
  } else if (content === undefined) {
    respond = 'undefined'
  } else {
    respond = ''
  }

  return (
    <div style={style} className={'RecastAppText CaiAppText'}>
      {respond}
      {iframeSrc&&
      (<iframe src={iframeSrc} width={iframeWidth} height={iframeHeight} scrolling={iframeScroll} frameborder="0"/>)
      }
    </div>
  )
}

Text.propTypes = {
  style: PropTypes.object,
  content: PropTypes.string,
}

export default Text
