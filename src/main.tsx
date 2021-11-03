import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Index from '@/index'

import express from 'express'
import path from 'path'

const server = express()

server
  /** main.js 는 서버 소스이므로 빌드결과물 노출에 포함되어선 안됩니다. */
  .use(({ path }, req, next) => {
    if (path === '/main.js') {
      req.status(404)
      req.end('Cannot GET /main.js')
      return
    }
    next()
  })
  /** 빌드 결과물 및 퍼블릭 리소스를 엔드포인트에 노출 합니다. */
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../public')))
  /** 캐치되지 않은 URL은 모두 React Index를 렌더링 합니다. */
  .use((req, res) => {
    const context = {}
    res.end(
      ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Index/>
        </StaticRouter>,
      ),
    )
  })
  .listen(4000)
