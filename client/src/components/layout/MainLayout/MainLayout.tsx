import Header from '../Header/Header';
import { Container } from '@mui/material';

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[];
  childrenElement?: JSX.Element;
  style?: React.CSSProperties;
}

const MainLayout = ({ children }: Props) => (
  <main>
    <Header />
    <Container maxWidth="lg">{children}</Container>
  </main>
);

export default MainLayout;
