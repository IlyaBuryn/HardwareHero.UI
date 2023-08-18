import React, { useEffect } from 'react';
import { UserManager, WebStorageStateStore } from 'oidc-client';
import clientConfig from '../../../identity/identityClientConfig';

const Callback = () => {
  useEffect(() => {
    const processCallback = async () => {
      const userManager = new UserManager({
        ...clientConfig,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
      });

      const user = await userManager.signinRedirectCallback();
      console.log(user);
    };

    processCallback();
  }, []);

  return (
    <div>
      <h2>Обработка авторизации...</h2>
    </div>
  );
};

export default Callback;
