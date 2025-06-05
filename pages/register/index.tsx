import React from 'react'

import Head from 'next/head';

import Register from '@components/Authentication/Pages/Register';

const Page = () => {
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <Register />
    </>
  )
}

export default Page