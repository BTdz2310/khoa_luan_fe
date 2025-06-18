import React, { ReactElement } from 'react'

import Head from 'next/head';

import Dashboard from '@components/Dashboard/Pages';
import DashboardLayout from '@layout/DashboardLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page