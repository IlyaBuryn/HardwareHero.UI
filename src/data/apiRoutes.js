export const useApiRoutes = () => {

  const identityRoutes = {
    'signIn': 'gateway/sign-in',
    'signUp': 'gateway/sign-up',
    'userById': 'gateway/user/',
  };

  const contributorRoutes = {
    'createOne': 'gateway/contributor',
    'getOneByUserId': 'gateway/contributor/by-user/',
    'deleteOne': 'gateway/contributor/',
    'uploadImage': 'gateway/contributor/upload-image',
    'getMany': 'gateway/contributor',
    'updateOne': 'gateway/contributor',
    'getOneByName': 'gateway/contributor/',
    'sendEmail': 'gateway/mail/send',
  };

  const configuratorRoutes = {
    'getTypes': 'gateway/configurator/component-type-signs'
  };

  const assemblyRoutes = {
    'createOne': 'gateway/assemblies',
    'getOneByUserId': 'gateway/assemblies/',
  }

  const aggregatorRoutes = {
    'getManyAsPage': 'gateway/aggregator/components/',
    'getOneById': 'gateway/aggregator/component/',
    'getPageCount': 'gateway/aggregator/components/pageCount',
  }


  return {
    identityRoutes,
    contributorRoutes,
    configuratorRoutes,
    assemblyRoutes,
    aggregatorRoutes,
  };
}