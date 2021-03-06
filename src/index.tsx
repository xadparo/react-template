import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/app'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

/**
 * React SSR용 컴포넌트 입니다.
 * 기존 {dist,public}/index.html을 대체 합니다.
 * @return {JSX.Element}
 */
export const Index = () => <html lang="ko">
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="/index.css"/>
  </head>
  <div id="root">
    <App/>
  </div>
  <script type="module" src="/index.js"/>
</html>
export default Index

/**
 * React CSR 과정입니다.
 * 이 로직은 <script src="./index.js"/> 로써 실행 됩니다.
 */
if (typeof document !== 'undefined') {
  ReactDOM.render(<BrowserRouter>
    <App/>
  </BrowserRouter>, document.getElementById('root'))
}
