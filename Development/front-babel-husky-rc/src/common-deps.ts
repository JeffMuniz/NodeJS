const insertNewImportMap = (newMapJSON: any) => {
  const newScript = document.createElement('script');
  newScript.type = 'systemjs-importmap';
  newScript.text = JSON.stringify(newMapJSON);

  const allMaps = document.querySelectorAll(
    'script[type="systemjs-importmap"]'
  );

  allMaps[allMaps.length - 1].insertAdjacentElement('afterend', newScript);
};

const devDependencies = {
  imports: {
    react:
      'https://cdnjs.cloudflare.com/ajax/libs/react/16.11.0/umd/react.development.js',
    'react-dom':
      'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.development.js',
    'react-router-dom':
      'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.1.2/react-router-dom.js',
    rxjs: 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.3/rxjs.umd.js',
    axios: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.js',
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js'
  }
};

const prodDependencies = {
  imports: {
    react:
      'https://cdnjs.cloudflare.com/ajax/libs/react/16.11.0/umd/react.production.min.js',
    'react-dom':
      'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.11.0/umd/react-dom.production.min.js',
    'react-router-dom':
      'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.1.2/react-router-dom.min.js',
    rxjs: 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.3/rxjs.umd.min.js',
    axios: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js',
    lodash:
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js'
  }
};

if (process.env.ENVIRONMENT === 'local') {
  insertNewImportMap(devDependencies);
} else {
  insertNewImportMap(prodDependencies);
}
