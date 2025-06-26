import MatchedUser from '@/components/molecule/Page/Products/FashionMate/RightSwipe/MatchedUser';
import { getV1 } from '@/lib/actions/general';
import React from 'react';

const ExchangeMatePage = async ({ params }: { params: { id: string } }) => {
  console.log(params);

  const url = `/fashion-mate/get-mate-details/${params.id}`;
  console.log(url);
  const mate = await getV1(url);
  console.log(mate);
  return (
    <>
      <MatchedUser userData={mate} userId={params.id} />
    </>
  )
}

export default ExchangeMatePage