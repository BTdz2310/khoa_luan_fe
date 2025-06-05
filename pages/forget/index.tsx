import React from 'react'

import Head from 'next/head';

import Forget from '@components/Authentication/Pages/Forget';

const Page = () => {
  return (
    <>
      <Head>
        <title>Quên mật khẩu</title>
      </Head>
      <Forget />
    </>
  )
}

export default Page