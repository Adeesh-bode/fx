import Imagine from '@/components/molecule/Page/Story/Imagine'
import SwapHow from '@/components/molecule/Page/Story/SwapHow'
import SwapIdea from '@/components/molecule/Page/Story/SwapIdea'
import Trapped from '@/components/molecule/Page/Story/Trapped'
import WhatCost from '@/components/molecule/Page/Story/WhatCost'
import WhatMore from '@/components/molecule/Page/Story/WhatMore'
import React from 'react'

const Story = () => {
  return (
    <main>
      <Trapped />
      <WhatCost />
      <Imagine />
      <SwapIdea />
      <SwapHow />
      <WhatMore />
    </main>
  )
}

export default Story