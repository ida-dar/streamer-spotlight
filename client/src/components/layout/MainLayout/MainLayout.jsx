import Header from '../Header/Header';
import { Container } from '@mui/material';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    <Container>
      {children}
    </Container>
  </div>
);

export default MainLayout;
