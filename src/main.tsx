import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Index from '@/index'

import express from 'express'
import path from 'path'

const server = express()

server
  /** 빌드 결과물 및 퍼블릭 리소스를 엔드포인트에 노출 합니다. */
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../public')))
  /** 캐치되지 않은 URL은 모두 React Index를 렌더링 합니다. */
  .use((_, res) => {
    res.status(200)
    res.end(ReactDOMServer.renderToString(<Index/>))
  })
  .listen(4000)
