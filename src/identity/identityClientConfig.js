const clientConfig = {
  authority: 'http://localhost:5000',
  client_id: 'react.web.app',
  redirect_uri: 'http://localhost:5001/home',
  response_type: 'id_token token',
  scope: 'openid profile HardwareHero.Web HardwareHero.Service.Api',
  post_logout_redirect_uri: "http://localhost:5001/home",
};

export default clientConfig;
