import './App.css';
import { Provider } from './components/ui/provider';
import { Routes as RoutesEnum } from './enums/Routes';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { UserDetails } from './components/UserDetails';
import { Form } from './components/Form';
import { HStack, Button, Container } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { Counter } from './components/Counter';
import { LoaderProvider } from './components/Loader';
import { Product } from './components/Product';
import { ProductDetails } from './components/ProductDetails';
import { EditProduct } from './components/EditProduct';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <LoaderProvider>
          <Container>
            <HStack mb={20}>
              <Link to={RoutesEnum.Home}>
                <Button variant="subtle">{t('menu.home')}</Button>
              </Link>
              <Link to={RoutesEnum.About}>
                <Button variant="subtle">{t('menu.about')}</Button>
              </Link>
              <Link to={RoutesEnum.User + '/123'}>
                <Button variant="subtle">{t('menu.user')}</Button>
              </Link>
              <Link to={RoutesEnum.Form}>
                <Button variant="subtle">{t('menu.form')}</Button>
              </Link>
              <Link to={RoutesEnum.Counter}>
                <Button variant="subtle">{t('menu.counter')}</Button>
              </Link>
              <Link to={RoutesEnum.Product}>
                <Button variant="subtle">{t('menu.product')}</Button>
              </Link>

              <Button onClick={() => changeLanguage('en')}>
                {t('menu.language.english')}
              </Button>
              <Button onClick={() => changeLanguage('pl')}>
                {t('menu.language.polish')}
              </Button>
            </HStack>

            <Routes>
              <Route path={RoutesEnum.Home} element={<Home />} />
              <Route path={RoutesEnum.About} element={<About />} />
              <Route path={RoutesEnum.UserDetails} element={<UserDetails />} />
              <Route path={RoutesEnum.Form} element={<Form />} />
              <Route path={RoutesEnum.Counter} element={<Counter />} />
              <Route path={RoutesEnum.Product} element={<Product />} />
              <Route
                path={RoutesEnum.ProductDetails}
                element={<ProductDetails />}
              />
              <Route path={RoutesEnum.EditProduct} element={<EditProduct />} />
            </Routes>
            <Toaster />
          </Container>
        </LoaderProvider>
      </Router>
    </Provider>
  );
}

export default App;
