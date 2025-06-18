import React, { ReactElement } from 'react'

import Head from 'next/head';

import Profile from '@components/Profile/Pages';
import DashboardLayout from '@layout/DashboardLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Profile />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page