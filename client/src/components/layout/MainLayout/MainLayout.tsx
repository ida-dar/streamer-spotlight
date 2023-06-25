import Header from '../Header/Header';
import { Container } from '@mui/material';

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[];
  childrenElement?: JSX.Element;
  style?: React.CSSProperties;
}

const MainLayout = ({ children }: Props) => (
  <div>
    <Header />
    <Container>{children}</Container>
  </div>
);

export default MainLayout;
