import React from 'react'

import Head from 'next/head';

import Login from '@components/Authentication/Pages/Login';

const Page = () => {
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <Login />
    </>
  )
}

export default Page