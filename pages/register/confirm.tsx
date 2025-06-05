import React from 'react'

import Head from 'next/head';

import RegisterConfirm from '@components/Authentication/Pages/RegisterConfirm';
import { Remember } from '@custom-types/otp';


const Page = ({ otpData }: { otpData: Remember }) => {
  return (
    <>
      <Head>
        <title>Xác thực đăng ký</title>
      </Head>
      <RegisterConfirm otpData={otpData} />
    </>
  )
}

// eslint-disable-next-line require-await
export async function getServerSideProps(context: any) {
  const encodedData = context.req.headers['x-verify-otp'] as string | undefined;

  if (!encodedData) {
    return { notFound: true };
  }

  const otpData = JSON.parse(decodeURIComponent(encodedData));

  return {
    props: { otpData },
  };
}

export default Page