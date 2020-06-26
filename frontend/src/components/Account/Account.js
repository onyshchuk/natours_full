import React from 'react'

import AccountSettingsForm from './account-settings-form'
import PasswordChangeForm from './password-change-form'

const Account = () => {
   return (
      <div className="user-view__content">
         <div className="user-view__form-container">
            <h2 className="heading-tertiary u-margin-bottom-medium">
               Your account settings
            </h2>
            <AccountSettingsForm />
         </div>
         <div className="line">&nbsp;</div>
         <div className="user-view__form-container">
            <h2 className="heading-tertiary u-margin-bottom-medium">
               Password change
            </h2>
            <PasswordChangeForm />
         </div>
      </div>
   )
}

export default Account
