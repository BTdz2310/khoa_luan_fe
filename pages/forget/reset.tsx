import React from 'react'

import Head from 'next/head';

import ForgetReset from '@components/Authentication/Pages/ForgetReset';
import { Remember } from '@custom-types/otp';

const Page = ({ otpData }: { otpData: Remember }) => {
  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu</title>
      </Head>
      <ForgetReset otpData={otpData} />
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