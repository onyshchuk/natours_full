import React from 'react'

import AccountLayout from './accountLayout'

const withLayout = Component => () => (
   <AccountLayout>
      <Component />
   </AccountLayout>
)

export default withLayout
