import { useState } from 'react';

const setAnchor = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e: any) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return {
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
  };
};

export default setAnchor;
