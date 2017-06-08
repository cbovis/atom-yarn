'use babel';

import _ from 'lodash';

function getRepositoryUrl(repository) {
  switch (typeof repository) {
    case 'string':
      return formatShortUrl(repository);
    case 'object':
      return repository.url;
    default:
      return null;
  }
}

function formatShortUrl(shortUrl) {
  const urlParts = shortUrl.split(':');
  const identifier = _.get(urlParts, '[1]', shortUrl);

  switch (urlParts[0]) {
    case 'gist':
      return `https://gist.github.com/${identifier}`;
    case 'bitbucket':
      return `https://bitbucket.org/${identifier}`;
    case 'gitlab':
      return `https://gitlab.com/${identifier}`;
    default:
      return `https://github.com/${identifier}`;
  }
}

export default getRepositoryUrl;
