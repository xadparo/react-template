import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import path from 'path'

import App from './app'

const server = express()

server
  .get('/health', (req, res) => {
    return res.status(200).end(`I'm fine.`)
  })
  .use(express.static(path.resolve(__dirname, 'dist')))
  .use(express.static(path.resolve(__dirname, '../public')))
  .get('/', (req, res) => {
    res.end(renderToString(<App/>))
  })
  .listen(4000)
