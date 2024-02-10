import { FC } from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  
  const {store, props} = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default MyApp
